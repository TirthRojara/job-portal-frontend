import React from "react";
import TanStackProvider from "./tanStack.provider";
import ReduxProvider from "./redux.provider";

const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <ReduxProvider>
            <TanStackProvider>
              {children}
            </TanStackProvider>
        </ReduxProvider>
    );
};

export default AppProvider;
