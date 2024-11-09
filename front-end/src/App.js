import React from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import AccountNav from './components/AccountNav';
import AddressLink from './components/AddressLink';
import Header from './components/Header';
import Footer from './components/Footer';
import Perk from './components/Perk';
import PlaceGallery from './components/PlaceGallery';
import Rate from './components/Rate';

function App() {
  return (
    <div className="App">
      <Header/>
      <nav>
        <Link to="/account">Account</Link>
        <Link to="/address">Address</Link>
        <Link to="/perk">Perk</Link>
        <Link to="/place-gallery">Place Gallery</Link>
        <Link to="/rate">Rate</Link>
      </nav>
      <Routes>
        <Route path="/account" element={<AccountNav />} />
        <Route path="/address" element={<AddressLink>123 Main St, New York, NY</AddressLink>} />
        <Route path="/perk" element={<Perk />} />
        <Route path="/place-gallery" element={<PlaceGallery />} />
        <Route path="/rate" element={<Rate />} />
      </Routes>
      <Footer/>
    </div>
  );
}
export default App;
