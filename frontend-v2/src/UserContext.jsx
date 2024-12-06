import { createContext, useEffect, useState } from "react";
import axios from "axios";
import PropTypes from 'prop-types';

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);

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
      } finally {
        setReady(true);
      }
    };

    fetchUserProfile();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, ready }}>
      {children}
    </UserContext.Provider>
  );
}

UserContextProvider.propTypes = {
  children: PropTypes.node.isRequired
};