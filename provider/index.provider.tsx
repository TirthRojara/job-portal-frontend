"use client";
import React, { useEffect, useRef, useState } from "react";
import TanStackProvider from "./tanStack.provider";
import ReduxProvider from "./redux.provider";
import { Toaster } from "@/components/ui/sonner";
import ThemeEffect from "./theme-effect";
import { useAppSelector } from "@/store/index.store";
import { io, Socket } from "socket.io-client";
import { SocketContext } from "./socket/socket.context";
import SocketProvider from "./socket.provider";

const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        // <ReduxProvider>
        <TanStackProvider>
            {/* <SocketContext.Provider value={socketInstance}> */}
            <SocketProvider>
                <main>
                    <ThemeEffect />
                    {children}
                </main>
                <Toaster position="top-center" richColors theme="system" style={{ zIndex: 99999 }} />
            </SocketProvider>
            {/* </SocketContext.Provider> */}
        </TanStackProvider>
        // </ReduxProvider>
    );
};

export default AppProvider;
