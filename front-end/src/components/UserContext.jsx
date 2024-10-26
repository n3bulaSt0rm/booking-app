import { createContext, useEffect, useState } from "react";
import axios from "axios";
import React from 'react';


export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    if (!user) {
      axios.get("/profile").then(({ data }) => {
        setUser(data);
        setReady(true);
      });
    }
  }, []);
  return (
    <UserContext.Provider value={{ user, setUser, ready }}>
      {children}
    </UserContext.Provider>
  );
}

//UserContext là một context trong React được sử dụng để chia sẻ thông tin người dùng trên toàn bộ ứng dụng mà không cần truyền dữ liệu qua từng component một.

//serContextProvider bao quanh BrowserRouter để đảm bảo rằng thông tin người dùng có sẵn cho tất cả các component bên trong BrowserRouter, bao gồm các 
//route và component được quản lý trong App. Điều này cho phép bất kỳ component nào

// bên trong UserContextProvider truy cập dữ liệu người dùng từ context này dễ dàng hơn.
