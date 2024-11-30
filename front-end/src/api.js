import axios from 'axios';

const api = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    "ngrok-skip-browse-warning": "true"
  }
});

export default api;
