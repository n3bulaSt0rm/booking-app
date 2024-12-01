import { Link, Navigate } from "react-router-dom";
import { useContext, useState } from "react";
import axios from "axios";
import { UserContext } from "../UserContext";
import Footer from "../Footer";

export default function LoginPage() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [redirect, setRedirect] = useState(false);
  const { setUser } = useContext(UserContext);

  // Handle input changes
  function handleInputChange(ev) {
    const { name, value } = ev.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  // Handle form submission
  async function handleLoginSubmit(ev) {
    ev.preventDefault();
    try {
      const { data } = await axios.post("/users/login", formData);
      alert("Login successful.");
      // Save token and set user context
      localStorage.setItem("token", data.accessToken);
      setUser(data);
      setRedirect(true);
    } catch (error) {
      console.error("Login failed:", error.message);
      alert("Login failed. Please check your credentials.");
    }
  }

  if (redirect) {
    return <Navigate to="/" />;
  }

  return (
      <div className="pt-5 flex flex-col min-h-screen">
        {/* Header */}
        <header className="flex justify-between px-10 mb-7">
          <Link
              to="/"
              className="flex items-center gap-1 text-primary md:pl-2 lg:pl-5"
          >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-10 h-10"
            >
              <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"
              />
            </svg>
            <span className="font-bold text-2xl text-primary hidden md:flex">
            StayEasy
          </span>
          </Link>
        </header>

        {/* Main Content */}
        <div className="mt-4 grow flex items-center justify-around">
          <div className="mb-32 border p-5 border-1 border-gray-300 rounded-xl">
            <h1 className="text-4xl font-bold text-center mb-4 text-gray-900">
              Login
            </h1>
            <form className="max-w-md mx-auto" onSubmit={handleLoginSubmit}>
              <label className="text-m font-medium text-gray-900" htmlFor="email">
                Your email
              </label>
              <input
                  className="input-log"
                  id="email"
                  type="email"
                  name="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={handleInputChange}
              />
              <label
                  className="text-m font-medium text-gray-900"
                  htmlFor="password"
              >
                Your password
              </label>
              <input
                  className="input-log"
                  id="password"
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleInputChange}
              />
              <button className="login-button">Login</button>
              <div className="text-center py-2 text-gray-900">
                Don't have an account yet?{" "}
                <Link className="font-semibold underline" to="/register">
                  Register
                </Link>
              </div>
            </form>
          </div>
        </div>

        {/* Footer */}
        <Footer />
      </div>
  );
}