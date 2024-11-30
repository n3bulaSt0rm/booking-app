import { Link } from "react-router-dom";
import AccountNav from "../components/AccountNav";
import { useEffect, useState } from "react";
import axios from "axios";
import React from "react";
import "./places-page.css";

export default function PlacesPage() {
  const [places, setPlaces] = useState([]);
  useEffect(() => {
    axios.get("/user-places").then(({ data }) => {
      setPlaces(data);
    });
  }, []);
  return (
    <div className="places-page-container">
      <AccountNav />
      <div className="places-header">
        <Link to="/account/places/new" className="add-place-button">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="add-icon"
          >
            <path
              fillRule="evenodd"
              d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z"
              clipRule="evenodd"
            />
          </svg>
          Add new hotel
        </Link>
        <div className="places-list">
          {places.length > 0 &&
            places.map((place) => (
              <Link
                to={"/account/places/" + place._id}
                key={place._id}
                className="place-card"
              >
                <div className="place-image-container">
                  {place.photos.length > 0 ? (
                    <img src={place.photos[0]} alt={place.title} />
                  ) : (
                    <img
                      src="https://kelembagaan.kemnaker.go.id/assets/img/no-image.svg"
                      alt="No preview available"
                    />
                  )}
                </div>
                <div className="place-info">
                  <h2 className="place-title">{place.title}</h2>
                  <p className="place-description">{place.description}</p>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
}
