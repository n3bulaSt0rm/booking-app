import { Link, Navigate } from "react-router-dom";
import { useContext, useState } from "react";
import axios from "axios";
import { UserContext } from "../components/UserContext";
import Footer from "../components/Footer";
import React from "react";
import "./login-page.css";  // Importing the new CSS file

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState("");
  const { setUser } = useContext(UserContext);

  async function handleLoginSubmit(ev) {
    ev.preventDefault();
    try {
      const { data } = await axios.post("/users/login", {
        email,
        password,
      });
      alert("Login successful.");
      setUser(data);
      setRedirect(true);
    } catch (error) {
      alert("Login failed.");
    }
  }

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="login-page">
      <header className="login-header">
        <Link to={"/"} className="logo">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="logo-icon"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"
            />
          </svg>
          <span className="logo-text">StayEasy</span>
        </Link>
      </header>
      <div className="login-content">
        <div className="login-card">
          <h1 className="login-title">Login</h1>
          <form className="login-form" onSubmit={handleLoginSubmit}>
            <label className="login-label">Your email</label>
            <input
              className="login-input"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(ev) => setEmail(ev.target.value)}
            />
            <label className="login-label">Your password</label>
            <input
              className="login-input"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(ev) => setPassword(ev.target.value)}
            />
            <button className="login-button">Login</button>
            <div className="register-link">
              {"Don't have an account yet? "}
              <Link className="register-text" to={"/register"}>
                Register
              </Link>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}


// import { Link, Navigate } from "react-router-dom";
// import { useContext, useState, useEffect } from "react";
// import axios from "axios";
// import { UserContext } from "../components/UserContext";
// import Footer from "../components/Footer";
// import React from "react";
// import LoginForm from "../components/LoginForm";  // Import LoginForm component
// import "./login-page.css";  // Importing the new CSS file

// export default function LoginPage() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [redirect, setRedirect] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const { setUser } = useContext(UserContext);

//   // Handle login form submission
//   async function handleLoginSubmit(ev) {
//     ev.preventDefault();
//     setIsLoading(true);
//     try {
//       const { data } = await axios.post("/users/login", {
//         email,
//         password,
//       });
//       alert("Login successful.");
//       setUser(data);
//       setRedirect(true);
//     } catch (error) {
//       if (error.response) {
//         alert(`Login failed: ${error.response.data.message}`);
//       } else {
//         alert("Login failed. Please try again later.");
//       }
//     } finally {
//       setIsLoading(false);
//     }
//   }

//   // Redirect to homepage after login success
//   useEffect(() => {
//     if (redirect) {
//       return <Navigate to={"/"} />;
//     }
//   }, [redirect]);

//   // Render the page with login form and footer
//   return (
//     <div className="login-page">
//       <header className="login-header">
//         <Link to={"/"} className="logo">
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             fill="none"
//             viewBox="0 0 24 24"
//             strokeWidth="1.5"
//             stroke="currentColor"
//             className="logo-icon"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"
//             />
//           </svg>
//           <span className="logo-text">StayEasy</span>
//         </Link>
//       </header>

//       <div className="login-content">
//         <div className="login-card">
//           <h1 className="login-title">Login</h1>
//           <LoginForm
//             email={email}
//             setEmail={setEmail}
//             password={password}
//             setPassword={setPassword}
//             onSubmit={handleLoginSubmit}
//             isLoading={isLoading}
//           />
//         </div>
//       </div>

//       <Footer />
//     </div>
//   );
// }
