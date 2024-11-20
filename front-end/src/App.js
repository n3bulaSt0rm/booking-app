// import React from 'react';
// import { Route, Routes, Link } from 'react-router-dom';
// import AccountNav from './components/AccountNav';
// import AddressLink from './components/AddressLink';
// import Header from './components/Header';
// import Footer from './components/Footer';
// import Perk from './components/Perk';
// import PlaceGallery from './components/PlaceGallery';
// import Rate from './components/Rate';

// function App() {
//   return (
//     <div className="App">
//       <Header/>
//       <nav>
//         <Link to="/account">Account</Link>
//         <Link to="/address">Address</Link>
//         <Link to="/perk">Perk</Link>
//         <Link to="/place-gallery">Place Gallery</Link>
//         <Link to="/rate">Rate</Link>
//       </nav>
//       <Routes>
//         <Route path="/account" element={<AccountNav />} />
//         <Route path="/address" element={<AddressLink>123 Main St, New York, NY</AddressLink>} />
//         <Route path="/perk" element={<Perk />} />
//         <Route path="/place-gallery" element={<PlaceGallery />} />
//         <Route path="/rate" element={<Rate />} />
//       </Routes>
//       <Footer/>
//     </div>
//   );
// }
// export default App;

// import React from 'react';
// import { Route, Routes } from "react-router-dom";
// import "./App.css";
// import IndexPage from "./pages/IndexPage";
// import LoginPage from "./pages/LoginPage";
// import RegisterPage from "./pages/RegisterPage";
// import Layout from "./components/Layout";
// import axios from "axios";
// import { UserContextProvider } from "./components/UserContext";
// import ProfilePage from "./pages/ProfilePage";
// import PlacesPage from "./pages/PlacesPage";
// import PlacesFormPage from "./pages/PlacesFormPage";
// import PlacePage from "./pages/PlacePage";
// import BookingsPage from "./pages/BookingsPage";
// import BookingPage from "./pages/BookingPage";
// import AllPlaces from "./pages/AllPlaces";
// import FindPlacePage from "./pages/FindPlaces";
// import WishlistPage from "./pages/WishlistPage";
// import BookingManager from "./pages/BookingManager";
// axios.defaults.baseURL = "http://localhost:3005/";
// axios.defaults.withCredentials = true;

// function App() {
//   return (
//     <UserContextProvider>
//       <Routes>
//         <Route path="/" element={<Layout />}>
//           <Route index element={<IndexPage />} />
//           <Route path="/all" element={<AllPlaces />} />
//           <Route path="/account/profile" element={<ProfilePage />} />
//           <Route path="/account/profile/payment" element={<ProfilePage />} />
//           <Route path="/account/profile/safety" element={<ProfilePage />} />
//           <Route path="/account/profile/preference" element={<ProfilePage />} />
//           <Route
//             path="/account/profile/notification"
//             element={<ProfilePage />}
//           />
//           <Route path="/account/places" element={<PlacesPage />} />
//           <Route path="/account/places/new" element={<PlacesFormPage />} />
//           <Route path="/account/places/:id" element={<PlacesFormPage />} />
//           <Route path="/account/bookings" element={<BookingsPage />} />
//           <Route
//             path="/account/booking-management"
//             element={<BookingManager />}
//           />
//           <Route path="/account/bookings/:id" element={<BookingPage />} />
//           <Route path="/account/wishlist" element={<WishlistPage />} />
//           <Route path="/place/:id" element={<PlacePage />} />
//           <Route path="/find/:query" element={<FindPlacePage />} />
//         </Route>
//         <Route path="/login" element={<LoginPage />} />
//         <Route path="/register" element={<RegisterPage />} />
//       </Routes>
//     </UserContextProvider>
//   );
// }

// export default App;



import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import IndexPage from './pages/IndexPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<IndexPage />} />
      </Route>
    </Routes>
  );
}

export default App;
