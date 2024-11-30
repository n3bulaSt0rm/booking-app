import AccountNav from "../components/AccountNav";
import { useEffect, useState } from "react";
import axios from "axios";
import React from "react";

export default function BookingManager() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get("http://localhost:8080/booking-manager");
        setBookings(response.data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    fetchBookings();
  }, []);

  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // JavaScript months are 0-based.
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }

  async function deleteUser(userId) {
    try {
      const confirmed = window.confirm("Are you sure you want to delete this user?");
      if (!confirmed) return;

      await axios.delete(`http://localhost:8080/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      alert("User deleted successfully!");

      // Cập nhật danh sách booking sau khi xóa
      setBookings((prevBookings) => prevBookings.filter((booking) => booking.userId !== userId));
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Failed to delete user. Please try again.");
    }
  }

  return (
    <div className="">
      <AccountNav />
      {bookings.length === 0 && (
        <h1 className="text-center text-3xl font-semibold my-20">
          You don&apos;t have any booking !!!
        </h1>
      )}
      {bookings.length !== 0 && (
        <div className="flex place-content-center mt-8">
          <table className="py-10 w-3/4">
            <thead>
              <tr>
                <th className="border-b border-gray-300 py-2 w-64">Hotel</th>
                <th className="border-b border-gray-300 py-2 w-1/4">Contact</th>
                <th className="border-b border-gray-300 py-2">Phone</th>
                <th className="border-b border-gray-300 py-2">Check-in</th>
                <th className="border-b border-gray-300 py-2">Check-out</th>
                <th className="border-b border-gray-300 py-2">Price</th>
                <th className="border-b border-gray-300 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking._id}>
                  <td className="border-b border-gray-300 py-2 text-center px-2">
                    {booking.place.title}
                  </td>
                  <td className="border-b border-gray-300 py-2 text-center px-2">
                    {booking.user.email}
                  </td>
                  <td className="border-b border-gray-300 py-2 text-center px-2">
                    {booking.phone}
                  </td>
                  <td className="border-b border-gray-300 py-2 text-center px-2">
                    {formatDate(booking.checkIn)}
                  </td>
                  <td className="border-b border-gray-300 py-2 text-center px-2">
                    {formatDate(booking.checkOut)}
                  </td>
                  <td className="border-b border-gray-300 py-2 text-center px-2">
                    ${booking.price}
                  </td>
                  <td className="border-b border-gray-300 py-2 text-center px-2">
                    <button
                      onClick={() => deleteUser(booking.userId)}
                      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
