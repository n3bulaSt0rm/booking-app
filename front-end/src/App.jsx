import React from "react";
import { Routes, Route } from "react-router-dom"; 
import Layout from "./components/Layout";
import AllPlaces from "./pages/AllPlaces";
import BookingManager from "./pages/BookingManager";
import BookingPage from "./pages/BookingPage";
import BookingsPage from "./pages/BookingsPage";
import FindPlaces from "./pages/FindPlaces";
import IndexPage from "./pages/IndexPage";
import LoginPage from "./pages/LoginPage";
import PlacePage from "./pages/PlacePage";
import PlacesFormPage from "./pages/PlacesFormPage";
import PlacesPage from "./pages/PlacesPage";
import ProfilePage from "./pages/ProfilePage";
import RegisterPage from "./pages/RegisterPage";
import WishlistPage from "./pages/WishlistPage";
import UserContextProvider from "./components/UserContext";
import axios from "axios";



axios.defaults.baseURL = "http://localhost:8080/";
axios.defaults.withCredentials = true;

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path="/all" element={<AllPlaces />} />
          <Route path="/account/profile" element={<ProfilePage />} />
          <Route path="/account/profile/payment" element={<ProfilePage />} />
          <Route path="/account/profile/safety" element={<ProfilePage />} />
          <Route path="/account/profile/preference" element={<ProfilePage />} />
          <Route
            path="/account/profile/notification"
            element={<ProfilePage />}
          />
          <Route path="/account/places" element={<PlacesPage />} />
          <Route path="/account/places/new" element={<PlacesFormPage />} />
          <Route path="/account/places/:id" element={<PlacesFormPage />} />
          <Route path="/account/bookings" element={<BookingsPage />} />
          <Route
            path="/account/booking-management"
            element={<BookingManager />}
          />
          <Route path="/account/bookings/:id" element={<BookingPage />} />
          <Route path="/account/wishlist" element={<WishlistPage />} />
          <Route path="/place/:id" element={<PlacePage />} />
          <Route path="/find/:query" element={<FindPlaces />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </UserContextProvider>
  );
}

export default App;