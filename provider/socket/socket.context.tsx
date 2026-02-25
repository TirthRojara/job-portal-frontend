"use client";
import { Socket } from "socket.io-client";
import { createContext, useContext } from "react";

export const SocketContext = createContext<Socket | null>(null);

export const useSocket = () => {
    return useContext(SocketContext);
};
