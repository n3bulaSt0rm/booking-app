import React from "react";
import { Routes, Route } from "react-router-dom"; // Remove BrowserRouter
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

function App() {
  return (
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
        <Route path="/account/places/:id" element={<PlacesFormPage />} />
        <Route path="/account/bookings" element={<BookingsPage />} />
        <Route path="/account/booking-management" element={<BookingManager />} />
        <Route path="/account/bookings/:id" element={<BookingPage />} />
        <Route path="/account/wishlist" element={<WishlistPage />} />
        <Route path="/place/:id" element={<PlacePage />} />
        <Route path="/find/:query" element={<FindPlaces />} />
      </Route>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
  );
}

export default App;


// import React from "react";
// import { Routes, Route } from "react-router-dom";
// import Layout from "./components/Layout";
// import AllPlaces from "./pages/AllPlaces";
// import BookingManager from "./pages/BookingManager";
// import BookingPage from "./pages/BookingPage";
// import BookingsPage from "./pages/BookingsPage";
// import FindPlaces from "./pages/FindPlaces";
// import IndexPage from "./pages/IndexPage";
// import LoginPage from "./pages/LoginPage";
// import PlacePage from "./pages/PlacePage";
// import PlacesFormPage from "./pages/PlacesFormPage";
// import PlacesPage from "./pages/PlacesPage";
// import ProfilePage from "./pages/ProfilePage";
// import RegisterPage from "./pages/RegisterPage";
// import WishlistPage from "./pages/WishlistPage";

// function App() {
//   return (
//     <Routes>
//       <Route path="/" element={<Layout />}>
//         {/* Public Routes */}
//         <Route index element={<IndexPage />} />
//         <Route path="/all" element={<AllPlaces />} />
//         <Route path="/place/:id" element={<PlacePage />} />
//         <Route path="/find/:query" element={<FindPlaces />} />
        
//         {/* Account/Profile Routes */}
//         <Route path="/account/profile">
//           <Route index element={<ProfilePage />} />
//           <Route path="payment" element={<ProfilePage />} />
//           <Route path="safety" element={<ProfilePage />} />
//           <Route path="preference" element={<ProfilePage />} />
//           <Route path="notification" element={<ProfilePage />} />
//         </Route>

//         {/* Account Management Routes */}
//         <Route path="/account/places">
//           <Route index element={<PlacesPage />} />
//           <Route path="new" element={<PlacesFormPage />} />
//           <Route path=":id" element={<PlacesFormPage />} />
//         </Route>
//         <Route path="/account/bookings">
//           <Route index element={<BookingsPage />} />
//           <Route path=":id" element={<BookingPage />} />
//         </Route>
//         <Route path="/account/booking-management" element={<BookingManager />} />
//         <Route path="/account/wishlist" element={<WishlistPage />} />
//       </Route>

//       {/* Authentication Routes */}
//       <Route path="/login" element={<LoginPage />} />
//       <Route path="/register" element={<RegisterPage />} />
//     </Routes>
//   );
// }

// export default App;
