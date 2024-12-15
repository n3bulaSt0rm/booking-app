import { Link } from "react-router-dom";
import AccountNav from "../AccountNav";
import { useEffect, useState } from "react";
import axios from "axios";
import React from "react";
export default function PlacesPage() {
  const [places, setPlaces] = useState([]);
  const token = localStorage.getItem("token");
 
  useEffect(() => {
    if (!token) {
      alert("You must be logged in to view your places.");
      return;
    }
 
    axios
      .get("/place/all/by-owner", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(({ data }) => {
        setPlaces(data);
      })
      .catch((error) => {
        console.error("Failed to fetch user places:", error);
        alert("Failed to fetch user places. Please try again.");
      });
  }, [token]);
  const handleDeleteClick = (e, place) => {
    e.stopPropagation();
    e.preventDefault();
    // Step 1: Show confirmation dialog
    const userConfirmed = window.confirm(`Are you sure you want to delete the hotel "${place.title}"?`);

    // Step 2: If user cancels, do nothing
    if (!userConfirmed) return;

    // Step 3: If user confirms, perform DELETE request to API
    deletePlace(place._id);
  };

  const deletePlace = async (placeId) => {
    // Retrieve the token from localStorage
    const token = localStorage.getItem('token');

    // Set the Authorization header with the token
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await axios.delete(`/place/${placeId}`, config);

      if (response.status === 200) {
        // If successful, remove the place from the local state
        setPlaces((prevPlaces) => prevPlaces.filter((place) => place._id !== placeId));
        alert("Place deleted successfully!");
      } else {
        alert("Failed to delete the place.");
      }
    } catch (error) {
      console.error("Error deleting place:", error);
      alert("Error occurred while deleting.");
    }
  };
  return (
    <div className="mx-10 lg:mx-60 mb-8">
      <AccountNav />
      <div className="text-center">
        <Link
          className="inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full"
          to={"/account/places/new"}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path
              fillRule="evenodd"
              d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z"
              clipRule="evenodd"
            />
          </svg>
          Add new hotel
        </Link>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
          {places.length > 0 &&
            places.map((place) => (
              <Link
                to={"/account/places/" + place._id}
                key={place._id}
                className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 relative"
              >
                {/* Dấu X */}
                <button
                  // onClick={() => handleDeletePlace(place._id)}
                  onClick={(e) => handleDeleteClick(e, place)}
                  className="absolute top-2 right-2 w-5 h-5 text-0.5xl text-gray-500 hover:text-red-500 hover:border-red-500 flex items-center justify-center transition-all duration-300 ease-in-out transform hover:scale-110 focus:outline-none"
                >
                  ❌
                </button>

                <div className="h-96 overflow-hidden rounded-t-3xl">
                  {place.photos.length > 0 ? (
                    <img
                      src={place.photos[0]}
                      alt={place.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <img
                      src="https://kelembagaan.kemnaker.go.id/assets/img/no-image.svg"
                      alt="No preview"
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
                <div className="p-6">
                  <h2 className="text-lg font-semibold">{place.title}</h2>
                  <p className="text-sm text-gray-500 mt-2">{place.description}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-primary font-bold text-lg">
                      ${place.price}
                    </span>
                    <span className="text-gray-500">/night</span>
                  </div>
                </div>
              </Link>
            ))}
        </div>

      </div>
    </div>
  );
}