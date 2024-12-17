import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import '../Loading.css';

export default function FindPlacePage() {
  const { query } = useParams();
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        // const token = localStorage.getItem("token");
        // const { data } = await axios.get(`/place/find/${query}`, {
        //   headers: { Authorization: `Bearer ${token}` },
        // });
        const { data } = await axios.get(`/place/find/${query}`);
        setPlaces(data);
      } catch (error) {
        console.error("Error fetching places:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlaces();
  }, [query]);

  if (loading) {
    return (
        // <h1 className="px-10 sm:px-20 pt-3 font-semibold text-xl">Loading...</h1>
        <div className="loading-container">
        <div className="spinner"></div>
        <h1 className="loading-text">Loading...</h1>
      </div>
    );
  }

  return (
      <div>
        <h1 className="px-10 md:px-20 pt-3 font-semibold text-xl">
          {places.length > 0
              ? `There are ${places.length} places matching "${query}"`
              : `No places found for "${query}"`}
        </h1>
        <div className="px-10 md:px-20 my-6 grid gap-x-6 gap-y-8 grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
          {places.length > 0 ? (
              places.map((place) => (
                  <PlaceCard key={place._id} place={place} />
              ))
          ) : (
              <NotFound />
          )}
        </div>
      </div>
  );
}

function PlaceCard({ place }) {
  const defaultImage =
      "https://kelembagaan.kemnaker.go.id/assets/img/no-image.svg";

  return (
      <Link to={`/place/${place._id}`}>
        <div className="border-2 p-4 rounded-xl shadow-lg">
          <div className="bg-gray-500 mb-2 rounded-2xl flex">
            <img
                className="rounded-2xl object-cover aspect-square"
                src={place.photos?.[0] || defaultImage}
                alt={place.title || "Place"}
            />
          </div>
          <div className="h-24">
            <h2 className="font-bold overflow-hidden text-ellipsis">
              {place.title}
            </h2>
            <h3 className="text-sm text-gray-500 overflow-hidden text-ellipsis h-10">
              {place.address}
            </h3>
          </div>
          <div className="mt-1 flex justify-between">
            <span className="font-bold">${place.price}</span>/night
          </div>
        </div>
      </Link>
  );
}

function NotFound() {
  return (
      <div className="text-center">
        <img
            className="mx-auto"
            src="https://cdni.iconscout.com/illustration/premium/thumb/no-address-found-4344458-3613886.png?f=webp"
            alt="Not found"
        />
        <h1 className="text-4xl font-semibold">No places found!</h1>
      </div>
  );
}