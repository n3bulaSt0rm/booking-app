import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../api.js";
import React from "react";
import './all-places.css';

export default function AllPlaces() {
  const [places, setPlaces] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    api.get("/places").then((response) => {
      setPlaces(response.data);
    });
    api.get("/wishlist").then((response) => {
      if (response.data[0])
        setWishlist(response.data[0].wishlist.map((obj) => obj.place._id));
    });
  }, []);

  async function addWishlist(ev, place) {
    const res = await api.post("/wishlist", { place: place._id });
    if (res.data) {
      setWishlist((prevWishlist) => [...prevWishlist, place._id]);
    } else {
      alert("You must login to favorite places!!");
    }
  }

  async function removeWishlist(ev, place) {
    ev.preventDefault();
    await axios.put("/wishlist", { place: place._id });
    setWishlist((prevWishlist) =>
      prevWishlist.filter((id) => id !== place._id)
    );
  }

  return (
    <div className="all-places-container">
      <h1 className="header-title">All hotels</h1>
      <div className="places-grid">
        {places.length > 0 &&
          places.map((place) => (
            <div key={place._id} className="place-card">
              <Link to={"/place/" + place._id} className="place-link">
                <div className="place-image-container">
                  {place.photos?.[0] ? (
                    <img
                      className="place-image"
                      src={place.photos?.[0]}
                      alt={place.title}
                    />
                  ) : (
                    <img
                      className="place-image"
                      src="https://kelembagaan.kemnaker.go.id/assets/img/no-image.svg"
                      alt="No available"
                    />
                  )}
                </div>
                <div className="place-details">
                  <h2 className="place-title">{place.title}</h2>
                  <h3 className="place-address">{place.address}</h3>
                </div>
              </Link>
              <div className="place-footer">
                <div className="place-price">
                  <span>${place.price}</span>/night
                </div>
                {!wishlist.includes(place._id) ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="wishlist-icon add-to-wishlist"
                    onClick={(ev) => addWishlist(ev, place)}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="wishlist-icon remove-from-wishlist"
                    onClick={(ev) => removeWishlist(ev, place)}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                    />
                  </svg>
                )}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
