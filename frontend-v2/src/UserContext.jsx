import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    if (!user) {
      const token = localStorage.getItem("authToken");
      axios.get("/users/profile").then(({ data }) => {
        setUser(data);
        setReady(true);
      },
      {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });
    }
  }, []);
  return (
    <UserContext.Provider value={{ user, setUser, ready }}>
      {children}
    </UserContext.Provider>
  );
}
