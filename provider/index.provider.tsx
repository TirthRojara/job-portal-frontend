import React from "react";
import TanStackProvider from "./tanStack.provider";
import ReduxProvider from "./redux.provider";
import { Toaster } from "@/components/ui/sonner";
import ThemeEffect from "./theme-effect";

const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <ReduxProvider>
            <TanStackProvider>
                <main>
                    <ThemeEffect />
                    {children}
                </main>
                <Toaster position="top-center" richColors theme="system" style={{ zIndex: 99999 }} />
            </TanStackProvider>
        </ReduxProvider>
    );
};

export default AppProvider;
