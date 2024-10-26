import React from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import AccountNav from './components/AccountNav';
import AddressLink from './components/AddressLink';

function App() {
  return (
    <div className="App">
      <nav>
        <Link to="/account">Account</Link>
        <Link to="/address">Address</Link>
      </nav>
      <Routes>
        <Route path="/account" element={<AccountNav />} />
        <Route path="/address" element={<AddressLink>123 Main St, New York, NY</AddressLink>} />
      </Routes>
    </div>
  );
}

export default App;
