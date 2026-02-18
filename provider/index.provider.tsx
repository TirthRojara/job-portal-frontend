"use client";
import React, { useEffect, useRef, useState } from "react";
import TanStackProvider from "./tanStack.provider";
import ReduxProvider from "./redux.provider";
import { Toaster } from "@/components/ui/sonner";
import ThemeEffect from "./theme-effect";
import { useAppSelector } from "@/store/index.store";
import { io, Socket } from "socket.io-client";
import { SocketContext } from "./socket.provider";

const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
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

    return (
        // <ReduxProvider>
            <TanStackProvider>
                <SocketContext.Provider value={socketInstance}>
                    <main>
                        <ThemeEffect />
                        {children}
                    </main>

                    <Toaster position="top-center" richColors theme="system" style={{ zIndex: 99999 }} />
                </SocketContext.Provider>
            </TanStackProvider>
        // </ReduxProvider>
    );
};

export default AppProvider;
