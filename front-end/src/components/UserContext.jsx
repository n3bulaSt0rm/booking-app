import { createContext, useEffect, useState } from "react";
import axios from "axios";
import React from 'react';

export const UserContext = createContext({});

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!user) {
      axios.get('/profile').then(({ data }) => {
        setUser(data);
        setReady(true);
      });
    }
  }, []); git

  return (
    <UserContext.Provider value={{ user, setUser, ready }}>
      {children}
    </UserContext.Provider>
  );
};
