import { render, screen } from "@testing-library/react";
import AppProvider from "@/provider/index.provider";
import ReduxProvider from "@/provider/redux.provider";
import { ReactElement } from "react";

function AllProviders({ children }: { children: React.ReactNode }) {
    return (
        <ReduxProvider>
            <AppProvider>{children}</AppProvider>
        </ReduxProvider>
    );
}

export function renderWithProviders(ui: ReactElement) {
    return render(ui, { wrapper: AllProviders });
}
