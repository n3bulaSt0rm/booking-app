import AccountNav from "../components/AccountNav";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../api.js";
import React from "react";
import "./wishlist-page.css";

export default function WishlistPage() {
  const [places, setPlaces] = useState([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    api.get("/wishlist").then((response) => {
      if (response.data.length !== 0) {
        setPlaces(response.data[0].wishlist);
      }
      setReady(true);
    });
  }, []);

  async function removeWishlist(ev, place) {
    ev.preventDefault();
    await api.put("/wishlist", {
      place: place._id,
    });
    setPlaces((prevPlaces) =>
      prevPlaces.filter((item) => item.place._id !== place._id)
    );
  }

  if (!ready)
    return (
      <div>
        <AccountNav />
        <h1 className="loading-text">Loading...!</h1>
      </div>
    );

  return (
    <div className="wishlist-page">
      <AccountNav />
      {places.length === 0 && (
        <h1 className="empty-text">Let&apos;s add hotels to your wishlist !!!</h1>
      )}
      <div className="places-grid">
        {places.length > 0 &&
          places.map((doc) => (
            <div key={doc.place._id} className="place-card">
              <div className="card-content">
                <Link to={`/place/${doc.place._id}`}>
                  <div className="place-image">
                    {doc.place.photos?.[0] ? (
                      <img src={doc.place.photos?.[0]} alt={doc.place.title} />
                    ) : (
                      <img
                        src="https://kelembagaan.kemnaker.go.id/assets/img/no-image.svg"
                        alt="No preview available"
                      />
                    )}
                  </div>
                  <div className="place-details">
                    <h2 className="place-title">{doc.place.title}</h2>
                    <h3 className="place-address">{doc.place.address}</h3>
                  </div>
                </Link>
                <div className="card-footer">
                  <div className="place-price">
                    <span>${doc.place.price}</span> /night
                  </div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1}
                    stroke="currentColor"
                    className="remove-icon"
                    onClick={(ev) => removeWishlist(ev, doc.place)}
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
    </div>
  );
}
