import { useParams, Navigate, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import AddressLink from "../AddressLink";
import PlaceGallery from "../PlaceGallery";
import BookingDates from "../BookingDates";
import Rate from "../Rate";

export default function BookingPage() {
  const { id } = useParams();
  const [place, setPlace] = useState(null);
  const [booking, setBooking] = useState(null);
  const [redirect, setRedirect] = useState(false);
  const [rate, setRate] = useState(3);
  const [comment, setComment] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      const token = localStorage.getItem("token");
      axios
        .get("/booking", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          const foundBooking = response.data.find(({ _id }) => _id === id);
          if (foundBooking) {
            setBooking(foundBooking);
            setPlace(foundBooking.place);
          }
        })
        .catch((error) => {
          console.error("Failed to fetch bookings:", error);
          alert("Failed to fetch bookings.");
        });
    }
  }, [id]);

  if (!booking) {
    return "";
  }

  async function deleteBooking(ev) {
    ev.preventDefault();
    if (id) {
      const token = localStorage.getItem("token");
      await axios.delete(`/booking/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });
    }
    setRedirect(true);
  }
  if (redirect) {
    return <Navigate to={"/account/bookings"} />;
  }

  async function sendFeedback(ev) {
    const token = localStorage.getItem("token");
    ev.preventDefault();
    await axios.post(`/place/${booking.place._id}/feedback`, {
      comment,
      rate,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    });
    alert("Feedback successful.");
    setRedirect(true);
  }
  function handleOnClickTitlePlace(){
    navigate(`/place/${booking.place._id}`);
  }
  return (
    <div className="my-4 lg:mx-80 mx-10">
      <h1 className="text-3xl cursor-pointer hover:text-blue-500" onClick={() => handleOnClickTitlePlace()}>
        {booking.place.title}
      </h1>
      {/* <button onClick={handleOnClickTitlePlace}>{booking.place.title}</button> */}
      <AddressLink className="my-2 block">{booking.place.address}</AddressLink>
      <div className="bg-gray-200 p-6 my-6 rounded-2xl flex items-center justify-between">
        <div>
          <h2 className="text-2xl mb-4">Your booking information:</h2>
          <BookingDates booking={booking} />
        </div>
        <div className="bg-primary p-6 text-white rounded-2xl">
          <div>Total price</div>
          <div className="text-3xl">${booking.price}</div>
        </div>
      </div>
      <PlaceGallery place={booking.place} />

      <button
        onClick={deleteBooking}
        className=" mt-8 w-full bg-red-400 text-white mb-4 py-2 border rounded-xl text-xl font-semibold"
      >
        Cancel booking
      </button>
      <div className="pt-5 border-t-2 mt-3">
        <label className="block mb-2 text-xl font-semibold">Your review</label>
        <textarea
          value={comment}
          onChange={(ev) => setComment(ev.target.value)}
          id="message"
          rows="4"
          className="block p-2.5 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300"
          placeholder="Write your thoughts here..."
        ></textarea>
        <h1 className="font-semibold text-xl py-3">
          How do you rate our hotel?
        </h1>
        <Rate rating={rate} onRating={(rate) => setRate(rate)} />
        <button
          onClick={sendFeedback}
          className=" mt-5 w-full bg-primary hover:bg-blue-500 text-white mb-4 py-2 border rounded-xl text-xl font-semibold"
        >
          Send feedback
        </button>
      </div>
    </div>
  );
}