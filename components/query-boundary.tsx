import React from "react";

interface QueryBoundaryProps<T> {
    // State flags from TanStack Query
    data?: T;
    isLoading?: boolean;
    isError?: boolean;
    error?: Error | null;
    isEmpty?: boolean;

    // Fallback UI
    loadingFallback?: React.ReactNode;
    emptyFallback?: React.ReactNode;
    errorFallback?: React.ReactNode; // Optional: Override default error UI

    // 2. Allow children to be a function that receives Safe Data
    children: ((data: T) => React.ReactNode) | React.ReactNode;
}

export const QueryBoundary = <T,>({
    data,
    isLoading,
    isEmpty,
    isError,
    error,
    loadingFallback,
    emptyFallback,
    errorFallback,
    children,
}: QueryBoundaryProps<T>) => {
    // 1. Loading (Priority #1)
    if (isLoading) {
        return <>{loadingFallback}</>;
    }

    // 2. Error (Priority #2)
    if (isError) {
        if (errorFallback) return <>{errorFallback}</>;
        return null;

        // return (
        //     <ErrorBlock
        //         type='error'
        //         message={error?.message || 'Something went wrong'}
        //         description='Please try again later.'
        //     />
        // );
    }

    // 3. Empty (Priority #3)

    const isDataMissing = data === undefined || data === null;

    if (isEmpty || isDataMissing) {
        if (emptyFallback) return <>{emptyFallback}</>;
        return null;

        // return (
        //     <ErrorBlock
        //         type='no-data'
        //         message='No data found.'
        //         description='Try adjusting your filters.'
        //     />
        // );
    }

    // 4. Success (Priority #4)
    // At this point, we know data is present and not empty
    if (typeof children === "function") {
        // We cast 'data' to T because we checked isDataMissing above
        return <>{children(data as T)}</>;
    }

    // Otherwise render standard children
    return <>{children}</>;
};
