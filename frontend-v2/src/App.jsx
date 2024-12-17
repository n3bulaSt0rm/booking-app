import { Route, Routes } from "react-router-dom";
import "./App.css";
import IndexPage from "./pages/IndexPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Layout from "./Layout";
import axios from "axios";
import { UserContextProvider } from "./UserContext";
import ProfilePage from "./pages/ProfilePage";
import PlacesPage from "./pages/PlacesPage";
import PlacesFormPage from "./pages/PlacesFormPage";
import PlacePage from "./pages/PlacePage";
import BookingsPage from "./pages/BookingsPage";
import BookingPage from "./pages/BookingPage";
import AllPlaces from "./pages/AllPlaces";
import FindPlacePage from "./pages/FindPlaces";
import WishlistPage from "./pages/WishlistPage";
import BookingManager from "./pages/BookingManager";
// axios.defaults.baseURL = "https://booking-app-5ug6.onrender.com";
axios.defaults.baseURL = "http://localhost:8080";
axios.defaults.withCredentials = true;
// Sử dụng biến môi trường từ Vite
// axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;
// axios.defaults.withCredentials = import.meta.env.VITE_WITH_CREDENTIALS === "true";
// console.log('API Base URL:', import.meta.env.VITE_BASE_URL);
// console.log('With Credentials:', import.meta.env.VITE_WITH_CREDENTIALS);


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
          <Route path="/account/profile/notification" element={<ProfilePage />} />
          <Route path="/account/places" element={<PlacesPage />} />
          <Route path="/account/places/new" element={<PlacesFormPage />} />
          <Route path="/account/places/:id" element={<PlacePage />} />
          <Route path="/account/bookings" element={<BookingsPage />} />
          <Route path="/account/booking-management" element={<BookingManager />} />
          <Route path="/account/booking/:id" element={<BookingPage />} />
          <Route path="/account/wishlist" element={<WishlistPage />} />
          <Route path="/place/:id" element={<PlacePage />} />
          <Route path="/find/:query" element={<FindPlacePage />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </UserContextProvider>
  );
}

export default App;
