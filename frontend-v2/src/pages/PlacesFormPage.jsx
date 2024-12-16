import { Navigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Perk from "../Perk";
import axios from "axios";
import AccountNav from "../AccountNav";

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

  const [localPhotos, setLocalPhotos] = useState([]);

  function inputHeader(text) {
    return <h2 className="text-2xl mt-4">{text}</h2>;
  }
  function inputDescription(text) {
    return <p className="text-gray-500 text-sm">{text}</p>;
  }

  function preInput(header, description) {
    return (
      <>
        {inputHeader(header)}
        {inputDescription(description)}
      </>
    );
  }

  async function addPhotoByLink(ev) {
    ev.preventDefault();
    if (photoLink) {
      setAddedPhotos((prev) => [...prev, photoLink]);
      setPhotoLink("");
    }
  }

  async function removePhotoLink(filename) {
    setAddedPhotos(addedPhotos.filter((photo) => photo !== filename));
  }

  async function removePhotoLocal(filename) {
    setLocalPhotos(localPhotos.filter((photo) => photo !== filename));
  }

  const uploadFiles = async () => {
    try {
      const token = localStorage.getItem("token")
      const formData = new FormData();
      formData.append('folder', 'image');
      localPhotos.map((imgPath) => formData.append('image', imgPath))

      const response = await axios.put('/file/upload', formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data', 
        }
      });
      console.log('Files uploaded successfully:', response.data);
      return response.data.urls;
    } catch (error) {
      console.error('Error uploading files:', error.message);
    }
  };

  async function savePlace(ev) {
    ev.preventDefault();
    try{
      const urls = await uploadFiles()
      console.log("urls: ",urls)
      const updatedPhotos = [...addedPhotos, ...urls];
      setAddedPhotos(updatedPhotos);
      console.log('Added photos:', addedPhotos);
      const placeData = {
        title,
        address,
        addedPhotos : updatedPhotos,
        description,
        perks,
        extraInfo,
        checkIn,
        checkOut,
        maxGuests,
        price,
      };
      const token = localStorage.getItem("token");
      await axios.post("/place", placeData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Add token in the Authorization header
          },
        });
    } catch (error) {
      console.error('Error uploading place:', error.message);
    }
    setRedirect(true);
  }

  if (redirect) {
    return <Navigate to={"/account/places"} />;
  }

  const getLocalPhoto = async (event) => {
    const file = event.target.files[0]; 
    if (!file) return;
    setLocalPhotos(prevPhotos => [...prevPhotos, file]);
  };

  return (
    <div className="sm:w-4/5 mx-auto px-10">
      <AccountNav />
      <form onSubmit={savePlace}>
        {preInput(
          "Title",
          "Title for your place. should be short and catchy as in advertisement"
        )}
        <input
          className="w-full border mr-1 mt-2 py-1 px-4 rounded-xl"
          type="text"
          value={title}
          onChange={(ev) => setTitle(ev.target.value)}
          placeholder="title, for example: My lovely apt"
        />
        {preInput("Address", "Address to this place")}
        <input
          className="w-full border mr-1 mt-2 py-1 px-4 rounded-xl"
          type="text"
          value={address}
          onChange={(ev) => setAddress(ev.target.value)}
          placeholder="address"
        />
        {preInput("Photos", "More = better")}
        <div className="flex gap-2 py-2">
          <input
            className="w-full border mr-1 py-1 px-4 rounded-xl"
            type="text"
            value={photoLink}
            onChange={(ev) => setPhotoLink(ev.target.value)}
            placeholder="photo link"
          />
          <button
            onClick={addPhotoByLink}
            className=" bg-primary text-white px-4 rounded-xl font-semibold"
          >
            +
          </button>
        </div>
        <div className="mt-2 gap-2 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {addedPhotos.length > 0 &&
            addedPhotos.map((link) => (
              <div className="flex h-52 relative" key={link}>
                <img className="rounded-xl" src={link} />
                <div className="absolute top-2 left-2">
                  <button
                    onClick={() => removePhotoLink(link)}
                    className="text-white p-1 material-symbols-outlined bg-gray-950 rounded-xl bg-opacity-30"
                  >
                    delete
                  </button>
                </div>
              </div>
            ))}
          {localPhotos.length > 0 &&
            localPhotos.map((file) => {
              const localURL = URL.createObjectURL(file); // Tạo blob URL từ file
              return (
                <div className="flex h-52 relative" key={localURL}>
                  <img className="rounded-xl" src={localURL} alt="Local photo" />
                  <div className="absolute top-2 left-2">
                    <button
                      onClick={() => removePhotoLocal(file)}
                      className="text-white p-1 material-symbols-outlined bg-gray-950 rounded-xl bg-opacity-30"
                    >
                      delete
                    </button>
                  </div>
                </div>
              );
          })}
          <label className="h-52 cursor-pointer flex items-center gap-1 justify-center border bg-transparent rounded-2xl p-2 text-2xl text-gray-600">
            <input
              type="file"
              multiple
              className="hidden"
              onChange={getLocalPhoto}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-8 h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
              />
            </svg>
            Upload
          </label>
        </div>
        {preInput("Description", "Description of the place")}
        <textarea
          value={description}
          onChange={(ev) => setDescription(ev.target.value)}
        />
        {preInput("Perks", "Select all the perks of your place")}
        <div className="grid mt-2 gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
          <Perk selected={perks} onChange={setPerks} />
        </div>
        {preInput("Extra info", "house rules, etc")}
        <textarea
          value={extraInfo}
          onChange={(ev) => setExtraInfo(ev.target.value)}
        />
        {preInput(
          "Check in&out times",
          "add check in and out times, remember to have some time window for cleaning the room between guests"
        )}
        <div className="grid gap-3 grid-cols-2 md:grid-cols-4">
          <div>
            <h3 className="mt-2 -mb-1">Check in time</h3>
            <input
              className="w-full border my-2 py-2 px-4 rounded-xl"
              type="time"
              value={checkIn}
              onChange={(ev) => setCheckIn(ev.target.value)}
              placeholder="14:00"
            />
          </div>
          <div>
            <h3 className="mt-2 -mb-1">Check out time</h3>
            <input
              className="w-full border my-2 py-2 px-4 rounded-xl"
              type="time"
              value={checkOut}
              onChange={(ev) => setCheckOut(ev.target.value)}
              placeholder="11:00"
            />
          </div>
          <div>
            <h3 className="mt-2 -mb-1">Max number of guests</h3>
            <input
              className="w-full border my-2 py-2 px-4 rounded-xl"
              type="number"
              value={maxGuests}
              onChange={(ev) => setMaxGuests(ev.target.value)}
            />
          </div>
          <div>
            <h3 className="mt-2 -mb-1">Price per night ($)</h3>
            <input
              className="w-full border my-2 py-2 px-4 rounded-xl"
              type="number"
              value={price}
              onChange={(ev) => setPrice(ev.target.value)}
            />
          </div>
        </div>
        <button className="w-full bg-primary text-white my-4 py-2 border rounded-xl text-xl font-semibold">
          Save
        </button>
      </form>
    </div>
  );
}