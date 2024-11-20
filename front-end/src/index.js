import React from 'react';
import ReactDOM from 'react-dom/client'; // Lưu ý 'react-dom/client' trong React 18
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { UserContextProvider } from './components/UserContext';

const root = ReactDOM.createRoot(document.getElementById('root')); // Đảm bảo thẻ <div id="root"></div> có trong index.html

root.render(
  <React.StrictMode>
    <UserContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </UserContextProvider>
  </React.StrictMode>
);
