import React from "react";
import TanStackProvider from "./tanStack.provider";
import ReduxProvider from "./redux.provider";
import { Toaster } from "@/components/ui/sonner";

const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <ReduxProvider>
            <TanStackProvider>
                <main> {children}</main>
                <Toaster
                    position="top-center"
                    richColors
                    theme="system"
                />
            </TanStackProvider>
        </ReduxProvider>
    );
};

export default AppProvider;
