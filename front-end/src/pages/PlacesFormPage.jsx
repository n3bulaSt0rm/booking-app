import { Navigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Perk from "../components/Perk";
import axios from "axios";
import AccountNav from "../components/AccountNav";
import React from "react";
import "./places-form-page.css";

export default function PlacesFormPage() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState([]);
  const [photoLink, setPhotoLink] = useState("");
  const [extraInfo, setExtraInfo] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuests, setMaxGuests] = useState(1);
  const [price, setPrice] = useState(100);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get("/places" + id).then((response) => {
      const { data } = response;
      setTitle(data.title);
      setAddress(data.address);
      setAddedPhotos(data.photos);
      setDescription(data.description);
      setPerks(data.perks);
      setExtraInfo(data.extraInfo);
      setCheckIn(data.checkIn);
      setCheckOut(data.checkOut);
      setMaxGuests(data.maxGuests);
      setPrice(data.price);
    });
  }, [id]);

  async function addPhotoByLink(ev) {
    ev.preventDefault();
    if (photoLink) {
      setAddedPhotos((prev) => [...prev, photoLink]);
      setPhotoLink("");
    }
  }

  async function removePhoto(filename) {
    setAddedPhotos(addedPhotos.filter((photo) => photo !== filename));
  }

  async function deletePlace(ev) {
    ev.preventDefault();
    if (id) {
      const res = await axios.delete(`/places/${id}`, {});
      if (res.status === 200) {
        alert("Delete success!");
      }
    }
    setRedirect(true);
  }

  async function savePlace(ev) {
    ev.preventDefault();
    const placeData = {
      title,
      address,
      addedPhotos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      price,
    };
    if (id) {
      await axios.put("/places", {
        id,
        ...placeData,
      });
    } else {
      await axios.post("/places", placeData);
    }
    setRedirect(true);
  }

  if (redirect) {
    return <Navigate to={"/account/places"} />;
  }

  return (
    <div className="places-form-container">
      <AccountNav />
      <form onSubmit={savePlace} className="places-form">
        <div className="form-section">
          <h2>Title</h2>
          <p>Title for your place. Should be short and catchy as in advertisement.</p>
          <input
            type="text"
            value={title}
            onChange={(ev) => setTitle(ev.target.value)}
            placeholder="My lovely apt"
          />
        </div>
        <div className="form-section">
          <h2>Address</h2>
          <p>Address to this place.</p>
          <input
            type="text"
            value={address}
            onChange={(ev) => setAddress(ev.target.value)}
            placeholder="Address"
          />
        </div>
        <div className="form-section">
          <h2>Photos</h2>
          <p>More = better.</p>
          <div className="photo-upload">
            <input
              type="text"
              value={photoLink}
              onChange={(ev) => setPhotoLink(ev.target.value)}
              placeholder="Photo link"
            />
            <button onClick={addPhotoByLink}>+</button>
          </div>
          <div className="photos-grid">
            {addedPhotos.map((link) => (
              <div className="photo-card" key={link}>
                <img src={link} alt="Uploaded" />
                <button onClick={() => removePhoto(link)}>Remove</button>
              </div>
            ))}
          </div>
        </div>
        <div className="form-section">
          <h2>Description</h2>
          <p>Description of the place.</p>
          <textarea
            value={description}
            onChange={(ev) => setDescription(ev.target.value)}
          />
        </div>
        <div className="form-section">
          <h2>Perks</h2>
          <p>Select all the perks of your place.</p>
          <Perk selected={perks} onChange={setPerks} />
        </div>
        <div className="form-section">
          <h2>Extra Info</h2>
          <p>House rules, etc.</p>
          <textarea
            value={extraInfo}
            onChange={(ev) => setExtraInfo(ev.target.value)}
          />
        </div>
        <div className="form-section">
          <h2>Check-in & Check-out</h2>
          <p>
            Add check-in and out times, remember to have some time for cleaning.
          </p>
          <div className="form-grid">
            <div>
              <h3>Check-in time</h3>
              <input
                type="text"
                value={checkIn}
                onChange={(ev) => setCheckIn(ev.target.value)}
                placeholder="14:00"
              />
            </div>
            <div>
              <h3>Check-out time</h3>
              <input
                type="text"
                value={checkOut}
                onChange={(ev) => setCheckOut(ev.target.value)}
                placeholder="11:00"
              />
            </div>
            <div>
              <h3>Max number of guests</h3>
              <input
                type="number"
                value={maxGuests}
                onChange={(ev) => setMaxGuests(ev.target.value)}
              />
            </div>
            <div>
              <h3>Price per night</h3>
              <input
                type="number"
                value={price}
                onChange={(ev) => setPrice(ev.target.value)}
              />
            </div>
          </div>
        </div>
        <button type="submit" className="submit-button">Save</button>
      </form>
      {id && (
        <button onClick={deletePlace} className="delete-button">
          Remove this place
        </button>
      )}
    </div>
  );
}
