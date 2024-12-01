import { useEffect, useState, useContext } from "react";
import { useParams, Navigate } from "react-router-dom";
import axios from "axios";
import AddressLink from "../components/AddressLink";
import PlaceGallery from "../components/PlaceGallery";
import BookingWidget from "../components/BookingWidget";
import { UserContext } from "../components/UserContext";
import Rate from "../components/Rate";
import React from "react";
import "./place-page.css";

export default function PlacePage() {
  const { ready, user } = useContext(UserContext);
  const { id } = useParams();
  const [place, setPlace] = useState(null);
  const [feedbacks, setFeedbacks] = useState([]);
  const [rate, setRate] = useState(0);
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    const loadPlaceData = async () => {
      try {
        setLoading(true);
        setError(null);

        const [placeRes, feedbackRes, wishlistRes] = await Promise.all([
          axios.get(`/places/${id}`),
          axios.get(`/feedback/${id}`),
          axios.get("/wishlist")
        ]);

        setPlace(placeRes.data);

        if (feedbackRes.data && feedbackRes.data[0]) {
          setFeedbacks(feedbackRes.data[0].feedback?.reverse() || []);
          setRate(feedbackRes.data[0].rating || 0);
        }

        if (wishlistRes.data && wishlistRes.data[0]) {
          setWishlist(wishlistRes.data[0].wishlist?.map(obj => obj.place._id) || []);
        }
      } catch (error) {
        console.error('Error loading place data:', error);
        setError('Failed to load place data');
      } finally {
        setLoading(false);
      }
    };

    loadPlaceData();
  }, [id]);

  if (!ready) {
    return <div>Loading user data...</div>;
  }

  if (ready && !user) {
    return <Navigate to={"/login"} />;
  }

  if (loading) {
    return <div>Loading place data...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!place) {
    return <div>Place not found</div>;
  }

  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }

  async function addWishlist(ev, place) {
    ev.preventDefault();
    try {
      const response = await axios.post("/wishlist", {
        place: place._id,
      });
      if (response.status === 200) {
        setWishlist(prev => [...prev, place._id]);
      }
    } catch (error) {
      console.error("Error adding to wishlist:", error);
    }
  }

  async function removeWishlist(ev, place) {
    ev.preventDefault();
    try {
      const response = await axios.put("/wishlist", {
        place: place._id,
      });
      if (response.status === 200) {
        setWishlist(prev => prev.filter(id => id !== place._id));
      }
    } catch (error) {
      console.error("Error removing from wishlist:", error);
    }
  }

  return (
    <div className="place-page-container">
      <div className="place-header">
        <div className="place-details">
          <h1 className="place-title">{place?.title}</h1>
          <div className="place-rating">
            <span className="icon">★</span>
            {rate > 0 ? (
              <h1 className="rating-score">{rate.toPrecision(2)}</h1>
            ) : (
              <h1 className="rating-score">-</h1>
            )}
            <h1 className="rating-out-of">/5</h1>
            <h1 className="reviews-count">
              - {feedbacks?.length || 0} reviews
            </h1>
          </div>
        </div>
        {!wishlist.includes(place._id) ? (
          <button
            className="wishlist-button add"
            onClick={(ev) => addWishlist(ev, place)}
          >
            ♥
          </button>
        ) : (
          <button
            className="wishlist-button remove"
            onClick={(ev) => removeWishlist(ev, place)}
          >
            ♥
          </button>
        )}
      </div>
      <AddressLink>{place.address}</AddressLink>
      <PlaceGallery place={place} />
      <div className="place-details-grid">
        <div className="place-description">
          <h2>Description</h2>
          <p>{place.description}</p>
          <p>Check-in: {place.checkIn}</p>
          <p>Check-out: {place.checkOut}</p>
          <p>Max number of guests: {place.maxGuests}</p>
          <h3>Features:</h3>
          <ul>
            {place.perks.map((perk) => (
              <li key={perk}>{perk}</li>
            ))}
          </ul>
        </div>
        <BookingWidget place={place} />
      </div>
      <div className="extra-info-section">
        <h2>Extra info</h2>
        <p>{place.extraInfo}</p>
      </div>
      <div className="review-section">
        <h2>Reviews</h2>
        <div className="place-rating">
          <span className="icon">★</span>
          {rate > 0 ? (
            <h1 className="rating-score">{rate.toPrecision(2)}</h1>
          ) : (
            <h1 className="rating-score">-</h1>
          )}
          <h1 className="rating-out-of">/5</h1>
          <h1 className="reviews-count">
            - {feedbacks?.length || 0} reviews
          </h1>
        </div>
        <div className="reviews-grid">
          {feedbacks.map((feedback) => (
            <div key={feedback._id} className="review-card">
              <div className="review-header">
                <img
                  src="https://i.pinimg.com/originals/39/a4/71/39a47159059f38a954d77e5dcae6f0db.jpg"
                  alt="avatar"
                  className="avatar"
                />
                <div>
                  <h3>{`${feedback.user.firstName} ${feedback.user.lastName}`}</h3>
                  <p>{feedback.user.email}</p>
                  <Rate rating={feedback.rate} />
                  <p>{formatDate(feedback.date)}</p>
                </div>
              </div>
              <p className="review-comment">{feedback.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
