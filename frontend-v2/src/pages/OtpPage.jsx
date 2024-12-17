// import React, { useState, useEffect } from 'react';
// import { Navigate, useNavigate} from 'react-router-dom';
// // import './otp-page.css';
// const OtpPage = () => {
//   const [otp, setOtp] = useState('');
//   const [email, setEmail] = useState('');
//   const [error, setError] = useState(null);
//   const [isOtpSent, setIsOtpSent] = useState(false);
//   const navigate = useNavigate();
//   // const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
//   useEffect(() => {
//     // Lấy email từ localStorage khi trang OTP được tải
//     const storedEmail = localStorage.getItem('email');
//     if (storedEmail) {
//       setEmail(storedEmail);
//       requestOtp(storedEmail);
//     } else {
//       console.log("you did not input email")
//       //sleep(2s) o day 
//       // await sleep(2000);
//       navigate("/login");
//     }
//   }, []);

//   const requestOtp = async (email) => {
//     try {
//       const response = await fetch('http://localhost:8080/user/otp/login', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email }),
//       });

//       if (response.ok) {
//         setIsOtpSent(true);
//       } else {
//         throw new Error('Failed to send OTP');
//       }
//     } catch (err) {
//       setError('An error occurred while sending OTP');
      
//     }
//   };

//   const verifyOtp = async () => {
//     try {
//       const response = await fetch('http://localhost:8080/user/otp/verify', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           email,
//           otp,
//           context: 'login',
//         }),
//       });

//       if (response.ok) {
//         alert('OTP verified successfully');
//         // Redirect to the next page or perform further actions
//         localStorage.setItem('token', response.token);
//         return <Navigate to="/"/>
//       } else {
//         throw new Error('OTP verification failed');
//       }
//     } catch (err) {
//       setError('OTP verification failed');
//     }
//   };

//   const resendOtp = () => {
//     requestOtp(email);
//   };

//   return (
//     <div className="otp-page">
//       <h1>Enter OTP</h1>
//       <p className='mt-4 mb-4'>We've sent an OTP to you</p>
//       {error && <div className="error">{error}</div>}

//       <input
//         type="text"
//         maxLength="6"
//         value={otp}
//         onChange={(e) => setOtp(e.target.value)}
//         placeholder="XXX-XXX"
//         style={{ textTransform: 'uppercase' }}
//       />

//       <button className="mt-4 mb-4" onClick={verifyOtp}>Verify OTP</button>

//       {!isOtpSent && <button onClick={resendOtp}>Resend OTP</button>}
//     </div>
//   );
// };

// export default OtpPage;

import React, { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

const OtpPage = () => {
  const [otp, setOtp] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Lấy email từ localStorage khi trang OTP được tải
    const storedEmail = localStorage.getItem('email');
    if (storedEmail) {
      setEmail(storedEmail);
      requestOtp(storedEmail);
    } else {
      console.log("you did not input email");
      navigate("/login");
    }
  }, []);

  const requestOtp = async (email) => {
    try {
      const response = await fetch('http://localhost:8080/user/otp/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setIsOtpSent(true);
      } else {
        throw new Error('Failed to send OTP');
      }
    } catch (err) {
      setError('An error occurred while sending OTP');
    }
  };

  const verifyOtp = async () => {
    try {
      const response = await fetch('http://localhost:8080/user/otp/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          otp,
          context: 'login',
        }),
      });

      if (response.ok) {
        alert('OTP verified successfully');
        localStorage.setItem('token', response.token);
        return <Navigate to="/" />;
      } else {
        throw new Error('OTP verification failed');
      }
    } catch (err) {
      setError('OTP verification failed');
    }
  };

  const resendOtp = () => {
    requestOtp(email);
  };

  return (
    <div
      className="otp-page"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundColor: '#f7f7f7',
        fontFamily: 'Arial, sans-serif',
        padding: '20px',
      }}
    >
      <h1 style={{ color: '#333', fontSize: '2rem', marginBottom: '20px' }}>Enter OTP</h1>
      <p style={{ color: '#555', fontSize: '1.1rem' }} className="mt-4 mb-4">
        We've sent an OTP to you
      </p>

      {error && <div style={{ color: 'red', fontSize: '0.9rem', marginBottom: '20px' }}>{error}</div>}

      <input
        type="text"
        maxLength="6"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        placeholder="XXX-XXX"
        style={{
          width: '400px',
          padding: '10px',
          margin: '10px 0',
          border: '1px solid #ddd',
          borderRadius: '5px',
          fontSize: '1rem',
          textAlign: 'center',
          textTransform: 'uppercase',
        }}
      />

      <button
        onClick={verifyOtp}
        style={{
          padding: '10px 20px',
          margin: '10px 0',
          backgroundColor: '#007BFF',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          fontSize: '1rem',
          cursor: 'pointer',
          transition: 'background-color 0.3s ease',
          width: '220px', // Fixed width for both buttons
        }}
      >
        Verify OTP
      </button>

      {/* Resend OTP button */}
      {!isOtpSent && (
        <button
          onClick={resendOtp}
          style={{
            padding: '10px 20px',
            margin: '10px 0',
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            fontSize: '1rem',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease',
            width: '220px', // Fixed width for both buttons
          }}
        >
          Resend OTP
        </button>
      )}

    </div>
  );
};

export default OtpPage;
