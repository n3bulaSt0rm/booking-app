import { createContext, useEffect, useState } from "react";
import axios from "axios";
// import React from 'react';
import PropTypes from 'prop-types';

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const { data } = await axios.get('/profile');
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
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser, ready }}>
      {children}
    </UserContext.Provider>
  );
}

UserContextProvider.propTypes = {
  children: PropTypes.node.isRequired
};

