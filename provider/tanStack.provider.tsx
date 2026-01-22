"use client";

import React, { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: (failureCount, error: any) => {
                if (error?.status >= 400 && error?.status < 500) {
                    return false;
                }
                return failureCount < 2;
            },
            refetchOnWindowFocus: false,
            retryOnMount: false,
        },
        mutations: {
            retry: false,
        },
    },
});

const TanStackProvider = ({ children }: { children: React.ReactNode }) => {
    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

export default TanStackProvider;
