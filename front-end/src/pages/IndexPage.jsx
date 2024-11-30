import { useEffect, useState } from "react";
import api from "../api.js";
import { Link } from "react-router-dom";
import React from "react";
import "./index-page.css";

export default function IndexPage() {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    api.get("/top-feedback").then((response) => {
      setPlaces(response.data);
    });
  }, []);

  return (
    <div className="index-page-container">
      <div className="hero-banner">
        <h1 className="hero-title">Hãy đến với Go Booking</h1>
        <h2 className="hero-subtitle">
          Hơn 2.000.000 homestays tuyệt vời đang chờ đợi bạn!
        </h2>
      </div>

      <div className="popular-destinations-section">
        <h1 className="section-title">Địa điểm nổi tiếng</h1>
        <div className="popular-destinations-grid">
          <Link to="/find/Ha noi" className="destination-card hanoi">
            <div className="destination-label">
              <h1>Ha Noi</h1>
            </div>
          </Link>
          <div className="grid-rows-2">
            <Link to="/find/Nha Trang" className="destination-card nhatrang">
              <div className="destination-label">
                <h1>Nha Trang</h1>
              </div>
            </Link>
            <Link to="/find/Ho Chi Minh" className="destination-card hcm">
              <div className="destination-label">
                <h1>TP Ho Chi Minh</h1>
              </div>
            </Link>
          </div>
          <Link to="/find/Da Nang" className="destination-card danang">
            <div className="destination-label">
              <h1>Da Nang</h1>
            </div>
          </Link>
          <div className="grid-rows-2 grid-flow-row">
            <Link to="/find/Sa Pa" className="destination-card sapa">
              <div className="destination-label">
                <h1>Sa Pa</h1>
              </div>
            </Link>
            <Link to="/find/Phu Quoc" className="destination-card phuquoc">
              <div className="destination-label">
                <h1>Phu Quoc</h1>
              </div>
            </Link>
          </div>
        </div>
      </div>

      <div className="favorite-places-section">
        <h1 className="section-title">Địa điểm được yêu thích</h1>
        <div className="favorite-places-grid">
          {places.length > 0 &&
            places.map((doc) => (
              <Link to={"/place/" + doc.place._id} key={doc.place._id}>
                <div className="favorite-place-card">
                  <div className="place-image-container">
                    {doc.place.photos?.[0] ? (
                      <img
                        className="place-image"
                        src={doc.place.photos?.[0]}
                        alt=""
                      />
                    ) : (
                      <img
                        className="place-image"
                        src="https://kelembagaan.kemnaker.go.id/assets/img/no-image.svg"
                        alt=""
                      />
                    )}
                  </div>
                  <div className="place-details">
                    <h2 className="place-title">{doc.place.title}</h2>
                    <h3 className="place-address">{doc.place.address}</h3>
                  </div>
                  <div className="place-footer">
                    <div>
                      <span className="place-price">${doc.place.price}</span>
                      /night
                    </div>
                    <div className="rating">
                      <span className="material-symbols-outlined">star</span>
                      <h1 className="rating-value">
                        {doc.rating.toPrecision(2)}
                      </h1>
                      <h1 className="rating-max">/5</h1>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
        </div>
        <Link to="/all" className="view-all-link">
          <h1>Xem tất cả</h1>
          <span className="material-symbols-outlined">arrow_right_alt</span>
        </Link>
      </div>
    </div>
  );
}
