"use client";
import React, { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

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
    return (
        <QueryClientProvider client={queryClient}>
            {children}
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    );
};

export default TanStackProvider;
