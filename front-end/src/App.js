import React from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './components/Header'; // Import Header component
import Footer from './components/Footer'; // Import Footer component
import { UserContextProvider } from './components/UserContext'; // Import UserContextProvider

function App() {
  return (
    <UserContextProvider>
      <div className="App">
        <Header />
        <header className="App-header">
          <h1>Hello_world</h1>
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
        <Footer />
      </div>
    </UserContextProvider>
  );
}

export default App;
