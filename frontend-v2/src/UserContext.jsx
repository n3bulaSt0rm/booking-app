import { createContext, useEffect, useState } from "react";
import axios from "axios";
import PropTypes from 'prop-types';

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);

  // useEffect(() => {
  //   const fetchUserProfile = async () => {
  //     const token = localStorage.getItem("token");

  //     if (!token) {
  //       setReady(true);
  //       return;
  //     }

  //     try {
  //       const { data } = await axios.get("/user/profile", {
  //         headers: { Authorization: `Bearer ${token}` },
  //       });
  //       setUser(data);
  //     } catch (error) {
  //       console.error("Error fetching user profile:", error);
  //     } finally {
  //       setReady(true);
  //     }
  //   };

  //   fetchUserProfile();
  // }, []);
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setReady(true);
        return;
      }

      try {
        const { data } = await axios.get("/user/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(data);
      } catch (error) {
        console.error("Error fetching user profile:", error);
        if (error.response && error.response.status === 401) {
          // Nếu token hết hạn, thử refresh token
          await refreshToken();
        }
      } finally {
        setReady(true);
      }
    };

    // Gọi hàm để lấy profile của người dùng
    fetchUserProfile();
  }, [token]);

  // Hàm để làm mới token
  const refreshToken = async () => {
    try {
      const refreshToken = localStorage.getItem("refreshToken"); // Lấy refresh token từ localStorage
      if (!refreshToken) {
        console.error("No refresh token found");
        return;
      }

      // Gửi yêu cầu refresh token lên server
      const { data } = await axios.post("/user/refresh-token", { refreshToken });

      // Cập nhật access token và refresh token mới vào localStorage
      localStorage.setItem("token", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken); // Giả sử server trả lại refresh token mới

      // Cập nhật lại state token và user
      setToken(data.accessToken);
      setUser(data.user);
    } catch (error) {
      console.error("Error refreshing token:", error);
      setUser(null); // Nếu refresh token thất bại, logout người dùng
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
    }
  };
  return (
    <UserContext.Provider value={{ user, setUser, ready }}>
      {children}
    </UserContext.Provider>
  );
}

UserContextProvider.propTypes = {
  children: PropTypes.node.isRequired
};