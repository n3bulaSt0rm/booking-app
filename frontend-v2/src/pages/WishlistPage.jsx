import AccountNav from "../AccountNav";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function WishlistPage() {
  const [places, setPlaces] = useState([]);
  const [ready, setReady] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupState, setPopupState] = useState("confirm");
  const [selectedPlace, setSelectedPlace] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("You must be logged in to view your wishlist.");
      return;
    }

    const fetchWishlist = async () => {
      try {
        const response = await axios.get("/wishlist", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const wishlistPlaces = response.data?.places || [];
        setPlaces(wishlistPlaces);
      } catch (error) {
        console.error("Failed to fetch wishlist:", error);
        alert("Failed to fetch wishlist. Please try again.");
      } finally {
        setReady(true);
      }
    };

    fetchWishlist();
  }, []);

  const handleDeleteClick = (ev, place) => {
    ev.preventDefault();
    setSelectedPlace(place);
    setPopupState("confirm");
    setShowPopup(true);
  };

  const confirmDelete = async () => {
    setPopupState("deleting");

    const token = localStorage.getItem("token");

    try {
      await axios.delete(`/wishlist/${selectedPlace.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setPlaces((prevPlaces) =>
          prevPlaces.filter((item) => item.id !== selectedPlace.id)
      );

      setPopupState("success");

      setTimeout(() => {
        setShowPopup(false);
        setSelectedPlace(null);
        setPopupState("confirm");
      }, 1000);
    } catch (error) {
      console.error("Failed to remove from wishlist:", error);
      alert("Failed to remove place from wishlist. Please try again.");
      setShowPopup(false);
    }
  };

  if (!ready)
    return (
        <div>
          <AccountNav />
          <h1 className="text-center text-3xl font-semibold my-20">
            Loading...!
          </h1>
        </div>
    );

  return (
      <div>
        <AccountNav />
        {places.length === 0 ? (
            <h1 className="text-center text-3xl font-semibold my-20">
              Let&apos;s add hotels to your wishlist !!!
            </h1>
        ) : (
            <div className="lg:mx-20 mx-10 my-10 mt-6 grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {places.map((place) => (
                  <div key={place._id}>
                    <div className="border-2 p-4 rounded-xl shadow-lg">
                      <Link to={"/place/" + place._id}>
                        <div className="bg-gray-500 mb-2 rounded-2xl flex">
                          {place.photos?.[0] ? (
                              <img
                                  className="rounded-2xl object-cover aspect-square"
                                  src={place.photos[0]}
                                  alt={place.title}
                              />
                          ) : (
                              <img
                                  className="rounded-2xl object-cover aspect-square"
                                  src="https://kelembagaan.kemnaker.go.id/assets/img/no-image.svg"
                                  alt="No Image"
                              />
                          )}
                        </div>
                        <div className="h-24">
                          <h2 className="font-bold">{place.title}</h2>
                          <h3 className="text-sm text-gray-500">{place.address}</h3>
                        </div>
                      </Link>
                      <div className="mt-1 flex justify-between items-end">
                        <div>
                          <span className="font-bold">${place.price}</span>/night
                        </div>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1}
                            stroke="currentColor"
                            className="w-8 h-8 text-red-500 fill-current cursor-pointer"
                            onClick={(ev) => handleDeleteClick(ev, place)}
                        >
                          <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
              ))}
            </div>
        )}

        {showPopup && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
              <div className="bg-white rounded-lg p-6 max-w-sm w-full text-center">
                {popupState === "confirm" && (
                    <div>
                      <h2 className="text-lg font-semibold mb-4">
                        Are you sure you want to remove{" "}
                        <span className="font-bold">{selectedPlace?.title}</span> from
                        your wishlist?
                      </h2>
                      <div className="flex justify-end gap-4">
                        <button
                            onClick={() => setShowPopup(false)}
                            className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
                        >
                          Cancel
                        </button>
                        <button
                            onClick={confirmDelete}
                            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                        >
                          Confirm
                        </button>
                      </div>
                    </div>
                )}

                {popupState === "deleting" && (
                    <div>
                      <h2 className="text-lg font-semibold mb-4">
                        Deleting, please wait... 😊
                      </h2>
                    </div>
                )}

                {popupState === "success" && (
                    <div>
                      <h2 className="text-lg font-semibold mb-4">
                        Delete successfully! 😊
                      </h2>
                    </div>
                )}
              </div>
            </div>
        )}
      </div>
  );
}