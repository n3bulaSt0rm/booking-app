import { Form, Link, Navigate } from "react-router-dom";
import { useContext, useState } from "react";
import axios from "axios";
import { UserContext } from "../UserContext";
import Footer from "../Footer";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import './register-page.css';
const firebaseConfig = {
  apiKey: "AIzaSyD5aKjgMpkIHYvOpudMUI_E3nYurkOP-R8",
  authDomain: "first-project-eb47b.firebaseapp.com",
  projectId: "first-project-eb47b",
  storageBucket: "first-project-eb47b.firebasestorage.app",
  messagingSenderId: "95824278050",
  appId: "1:95824278050:web:b4b785c4272dc1f341907b",
  measurementId: "G-9185MKP3RR"
}

  const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default function LoginPage() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [redirect, setRedirect] = useState(false);
  const { setUser } = useContext(UserContext);
  const [isOtpModalOpen, setIsOtpModalOpen] = useState(false); //change to false if complete
  const context = "login";
  const [otp, setOtp] = useState("");

  const handleInputChange = (ev) => {
    const { name, value } = ev.target;
    // localStorage.setItem('email', value);
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLoginSubmit = async (ev) => {
    ev.preventDefault();
    try {
      const { data } = await axios.post("/user/login", formData);
      // alert("Login successful.");
      localStorage.setItem("token", data.accessToken);
      setUser(data);
      setRedirect(true);
    } catch (error) {
      console.error("Login failed:", error.message);
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const idToken = await result.user.getIdToken();
      const { data } = await axios.post("/user/login-google", { idToken });
      localStorage.setItem("token", data.accessToken);
      setUser(data);
      setRedirect(true);
    } catch (error) {
      console.error("Google Login failed:", error.message);
    }
  };
  const handlegetOTPValue = async () => {
    try {
      // Gửi OTP lên server để xác thực
      // await axios.post("/user/otp/login", { email });
      if (!formData.email) {
        alert("Please enter an email first.");
        return;
      }
      
      await axios.post("/user/otp/login", { email: formData.email });
      // console.log(response);
      alert("get OTP successfully!");
      setIsOtpModalOpen(true); 
      // setRedirect(true);
    } catch (err) {
      alert("get OTP failed. Please try again.");
    }
  };

  if (redirect) return <Navigate to="/" />;

  return (
      <div className="pt-5 flex flex-col min-h-screen">
        <Header />
        <div className="mt-4 grow flex items-center justify-center">
          <div className="mb-32 border p-5 border-gray-300 rounded-xl">
            <h1 className="text-4xl font-bold text-center mb-4 text-gray-900">
              Login
            </h1>
            <form className="max-w-md mx-auto" onSubmit={handleLoginSubmit}>
              <InputField
                  label="Your email"
                  id="email"
                  type="email"
                  name="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  handleChange={handleInputChange}
              />
              <InputField
                  label="Your password"
                  id="password"
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  value={formData.password}
                  handleChange={handleInputChange}
              />
              <button className="login-button">Login</button>
              {/* <p className="mt-6 text-left text-sm text-gray-900 hover:text-teal-500 hover:underline cursor-pointer">
                Forgot password?{" "} */}
                <button className="mt-6 text-left text-sm text-gray-900 hover:text-teal-500 hover:underline cursor-pointer" onClick={handlegetOTPValue}>
                  Login by OTP here
                </button>
              {/* </p> */}
              <div className="mt-4 text-center text-sm text-gray-500">or</div>
              <div className="mt-4 space-y-2">
                <button
                    type="button"
                    onClick={handleGoogleLogin}
                    className="w-full flex items-center justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <img
                      src="https://th.bing.com/th/id/OIP.Din44az7iZZDfbsrD1kfGQHaHa?rs=1&pid=ImgDetMain"
                      alt="Google"
                      className="h-5 w-5 mr-2"
                  />
                  Continue with Google
                </button>
                {/* <button className="w-full flex items-center justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Facebook_icon.svg/1200px-Facebook_icon.svg.png" alt="Facebook" className="h-5 w-5 mr-2" />
                  Continue with Facebook
                </button>
                <button className="w-full flex items-center justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  <img src="https://www.birdssoft.com/images/jdownloads/catimages/apple_logo.png" alt="Apple" className="h-5 w-5 mr-2" />
                  Continue with Apple
                </button> */}
              </div>
              <p className="text-center py-2 text-gray-900">
                Don't have an account yet?{" "}
                <Link className="font-semibold underline" to="/register">
                  Register
                </Link>
              </p>
            </form>
          </div>
        </div>
        {isOtpModalOpen && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h2 className="text-xl font-bold mb-4">Enter OTP</h2>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter OTP"
                className="input-log"
              />
              <div className="flex justify-center gap-4 mt-4">
                <button
                  onClick={async () => {
                    try {
                      const email = formData.email;
                      // Gửi OTP lên server để xác thực
                      const { data } = await axios.post("/user/otp/verify", {email, otp, context });
                      console.log(data);
                      localStorage.setItem("token", data.accessToken);
                      setUser(data);
                      alert("OTP verified successfully!");
                      setIsOtpModalOpen(false); // Đóng modal sau khi xác thực thành công
                      setRedirect(true);
                    } catch (err) {
                      alert("OTP verification failed. Please try again.");
                    }
                  }}
                  className="bg-blue-500 text-white px-4 py-2 rounded-full"
                >
                  Verify OTP
                </button>
                <button className="bg-blue-500 text-white px-4 py-2 rounded-full" onClick={handlegetOTPValue}>
                  Resend
                </button>
                <button
                  onClick={() => setIsOtpModalOpen(false)}
                  className="bg-red-500 text-white px-4 py-2 rounded-full"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
        <Footer />
      </div>
  );
}

function Header() {
  return (
      <header className="flex justify-between px-10 mb-7">
        <Link to="/" className="flex items-center gap-1 text-primary md:pl-2 lg:pl-5">
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
  );
}

function InputField({ label, id, type, name, placeholder, value, handleChange }) {
  return (
      <div className="mb-4">
        <label className="text-m font-medium text-gray-900" htmlFor={id}>
          {label}
        </label>
        <input
            className="input-log"
            id={id}
            type={type}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={handleChange}
        />
      </div>
  );
}