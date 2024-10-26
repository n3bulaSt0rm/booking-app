import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'; // Import BrowserRouter
import App from './App';
import './index.css'; // Nếu bạn có một file CSS toàn cục

ReactDOM.render(
  <BrowserRouter> {/* Wrap your App with BrowserRouter */}
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);
