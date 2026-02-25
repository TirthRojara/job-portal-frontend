"use client";
import React, { useEffect, useRef, useState } from "react";
import { SocketContext } from "./socket/socket.context";
import { io, Socket } from "socket.io-client";
import { useAppSelector } from "@/store/index.store";
const SocketProvider = ({ children }: { children: React.ReactNode }) => {
    const token = useAppSelector((state) => state.app.accessToken);
    const socketRef = useRef<Socket | null>(null);
    const [socketInstance, setSocketInstance] = useState<Socket | null>(null);

    useEffect(() => {
        if (!token) return;

        const socket = io("http://localhost:5000", {
            auth: { token },
        });

        socketRef.current = socket;
        setSocketInstance(socket);

        // 🔔 Global Notification Listener
        // socket.on("notification", (data) => {
        //     console.log("New notification:", data);
        //     // you can trigger toast here
        // });

        socket.on("statusUpdated", ({ jobId, status }: any) => {
            alert(`Job ${jobId} status updated: ${status}`);
            // Or update your component state here
            // you can trigger toast here
        });

        return () => {
            socket.disconnect();
        };
    }, [token]);

    return <SocketContext.Provider value={socketInstance}>{children}</SocketContext.Provider>;
};

export default SocketProvider;
