import React, { createContext, useContext, useEffect } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext();

const socket = io("https://task-managment-server-jilq.onrender.com/"); // Connect to backend

export const SocketProvider = ({ children }) => {
  useEffect(() => {
    return () => {
      socket.disconnect(); // Clean up on unmount
    };
  }, []);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);
