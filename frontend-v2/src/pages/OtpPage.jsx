import React, { useState, useEffect } from 'react';
import { Navigate, useNavigate} from 'react-router-dom';
import './otp-page.css';
const OtpPage = () => {
  const [otp, setOtp] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const navigate = useNavigate();
  // const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
  useEffect(() => {
    // Lấy email từ localStorage khi trang OTP được tải
    const storedEmail = localStorage.getItem('email');
    if (storedEmail) {
      setEmail(storedEmail);
      requestOtp(storedEmail);
    } else {
      console.log("you did not input email")
      //sleep(2s) o day 
      // await sleep(2000);
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
        // Redirect to the next page or perform further actions
        localStorage.setItem('token', response.token);
        return <Navigate to="/"/>
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
    <div className="otp-page">
      <h1>Enter OTP</h1>
      <p>We've sent an OTP to {email}</p>

      {error && <div className="error">{error}</div>}

      <input
        type="text"
        maxLength="6"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        placeholder="XXX-XXX"
        style={{ textTransform: 'uppercase' }}
      />

      <button onClick={verifyOtp}>Verify OTP</button>

      {!isOtpSent && <button onClick={resendOtp}>Resend OTP</button>}
    </div>
  );
};

export default OtpPage;
