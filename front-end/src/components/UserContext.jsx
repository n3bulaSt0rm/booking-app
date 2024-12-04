import { createContext, useEffect, useState } from "react";
import axios from "axios";
import React from 'react';

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        // Thay đổi endpoint này nếu cần thiết
        const { data } = await axios.get('user/profile');
        setUser(data);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      } finally {
        setReady(true);
      }
    };

    if (!user) {
      fetchUserProfile();
    }
  }, [user]); // Thêm user vào dependencies để cập nhật

  return (
    <UserContext.Provider value={{ user, setUser, ready }}>
      {children}
    </UserContext.Provider>
  );
}
