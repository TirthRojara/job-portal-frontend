"use client";

import * as React from "react";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import {
    ChevronLeft,
    ChevronRight,
    ChevronsLeft,
    ChevronsRight,
    SkipBack,
    SkipForward,
} from "lucide-react";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    pageSize?: number;
    onPageChange: (page: number) => void;
    className?: string;
}

export function PaginationBar({
    currentPage,
    totalPages,
    totalItems,
    pageSize = 10,
    onPageChange,
    className = "",
}: PaginationProps) {
    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages && page !== currentPage) {
            onPageChange(page);
        }
    };

    const getPageNumbers = (): number[] => {
        const pages: number[] = [];
        const maxVisible = 5;

        if (currentPage <= 3) {
            // First pages: show first 5 pages
            for (let i = 1; i <= Math.min(maxVisible, totalPages); i++) {
                pages.push(i);
            }
        } else if (currentPage >= totalPages - 2) {
            // Last pages: show last 5 pages
            const start = Math.max(1, totalPages - maxVisible + 1);
            for (let i = start; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            // Middle pages: show 5 pages centered around current
            const half = Math.floor((maxVisible - 1) / 2);   // 2
            const start = currentPage - half;                // 2  // current page = 4
            const end = currentPage + half;

            for (let i = start; i <= end; i++) {
                if (i >= 1 && i <= totalPages) {
                    pages.push(i);
                }
            }
        }

        return pages;
    };

    const pageNumbers = getPageNumbers();

    return (
        <div
            className={`flex justify-between w-full max-w-3xl   ${className} md:flex-row flex-col gap-3 md:gap-3`}
        >
            <div>
                <Pagination>
                    <PaginationContent className="gap-1">
                        {/* First Page */}
                        <PaginationItem>
                            <PaginationLink
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    handlePageChange(1);
                                }}
                                className={
                                    currentPage === 1
                                        ? "pointer-events-none opacity-50"
                                        : ""
                                }
                                aria-label="First page"
                            >
                                <ChevronsLeft className="h-4 w-4" />
                            </PaginationLink>
                        </PaginationItem>

                        {/* Previous */}
                        <PaginationItem>
                            <PaginationPrevious
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    handlePageChange(currentPage - 1);
                                }}
                                className={
                                    currentPage === 1
                                        ? "pointer-events-none opacity-50"
                                        : ""
                                }
                                aria-label="Previous page"
                            >
                                {/* <ChevronLeft className="h-4 w-4" /> */}
                            </PaginationPrevious>
                        </PaginationItem>

                        {/* Page Numbers */}
                        {pageNumbers.map((page, index) => (
                            <PaginationItem key={index}>
                                <PaginationLink
                                    href="#"
                                    isActive={page === currentPage}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handlePageChange(page);
                                    }}
                                    aria-label={`Page ${page}`}
                                >
                                    {page}
                                </PaginationLink>
                            </PaginationItem>
                        ))}

                        {/* Next */}
                        <PaginationItem>
                            <PaginationNext
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    handlePageChange(currentPage + 1);
                                }}
                                className={
                                    currentPage === totalPages
                                        ? "pointer-events-none opacity-50"
                                        : ""
                                }
                                aria-label="Next page"
                            >
                                {/* <ChevronRight className="h-4 w-4" /> */}
                            </PaginationNext>
                        </PaginationItem>

                        {/* Last Page */}
                        <PaginationItem>
                            <PaginationLink
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    handlePageChange(totalPages);
                                }}
                                className={
                                    currentPage === totalPages
                                        ? "pointer-events-none opacity-50"
                                        : ""
                                }
                                aria-label="Last page"
                            >
                                <ChevronsRight className="h-4 w-4" />
                            </PaginationLink>
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </div>

            {/* Items info */}
            {/* {totalItems !== undefined && ( */}
            <div className="   text-sm text-muted-foreground mt-2 text-center">
                Showing {(currentPage - 1) * pageSize! + 1} to{" "}
                {Math.min(currentPage * pageSize!, totalItems)} of {totalItems}{" "}
                results
            </div>
            {/* )} */}
        </div>
    );
}
