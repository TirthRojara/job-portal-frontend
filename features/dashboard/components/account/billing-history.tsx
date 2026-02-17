"use client";
import React from "react";
import { FileText } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useGetUserData } from "../../api/query";
import { useGetPaymentHistory, useGetSubscription } from "./api/subscription/query";
import { useAppSelector } from "@/store/index.store";
import { EmptyState } from "@/components/empty-state";
import { PaymentHistoryResponse } from "./api/subscription/types";
import { formatDateDMY, formatToLocalTime } from "@/lib/utils/utils";

// Define the Status type
// type BillingStatus = "SUCCESSFUL" | "FAILED" | "REFUNDED";

// Define the data interface
// interface BillingTransaction {
//     id: string;
//     date: string;
//     plan: string;
//     amount: string;
//     status: BillingStatus;
//     invoiceId: string;
// }

// Mock Data (You would likely fetch this from an API)
// const billingData: BillingTransaction[] = [
//     {
//         id: "1",
//         date: "1/9/2026",
//         plan: "Pro",
//         amount: "$29.00",
//         status: "SUCCESSFUL",
//         invoiceId: "#INV-001",
//     },
//     {
//         id: "2",
//         date: "12/9/2025",
//         plan: "Pro",
//         amount: "$29.00",
//         status: "SUCCESSFUL",
//         invoiceId: "#INV-002",
//     },
//     {
//         id: "3",
//         date: "11/9/2025",
//         plan: "Pro",
//         amount: "$29.00",
//         status: "REFUNDED", // Example of refunded state
//         invoiceId: "#INV-003",
//     },
//     {
//         id: "4",
//         date: "10/9/2025",
//         plan: "Basic",
//         amount: "$9.00",
//         status: "FAILED", // Example of failed state
//         invoiceId: "#INV-004",
//     },
// ];

export function BillingHistory() {
    // Helper function to get badge styles based on status
    const getStatusBadge = (status: string) => {
        switch (status) {
            case "SUCCESSFUL":
                return (
                    <Badge
                        variant="outline"
                        className="bg-emerald-50 text-emerald-700 dark:text-emerald-800 border-emerald-200 hover:bg-emerald-100 hover:text-emerald-800"
                    >
                        Paid
                    </Badge>
                );
            case "FAILED":
                return (
                    <Badge
                        variant="destructive"
                        className="bg-red-50 dark:bg-red-200 text-red-700 dark:text-red-700 border-red-200 dark:border-red-400 hover:bg-red-100 hover:text-red-800 dark:hover:bg-red-300 shadow-none border"
                    >
                        Failed
                    </Badge>
                );
            case "REFUNDED":
                return (
                    <Badge variant="secondary" className="bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200">
                        Refunded
                    </Badge>
                );
            default:
                return <Badge variant="outline">{status}</Badge>;
        }
    };

    const role = useAppSelector((state) => state.app.role);

    const { data: paymentHistory, isPending, isError, error } = useGetPaymentHistory(role);

    if (isPending) return <></>;

    if (error?.status === 404) {
        return (
            <Card className="w-full max-w-7xl shadow-sm border-none bg-background px-4">
                <CardHeader className="p-0 ">
                    <CardTitle className="text-xl font-bold text-foreground">Billing History</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                    <p>You don’t have any billing history yet.</p>
                </CardContent>
            </Card>
        );
    }

    if (isError && error.status !== 404) {
        return (
            <Card className="w-full max-w-7xl shadow-sm border-none bg-background px-4">
                <CardHeader className="p-0 ">
                    <CardTitle className="text-xl font-bold text-foreground">Billing History</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                    <p>Something went wrong. Please try again.</p>
                </CardContent>
            </Card>
        );
    }
    return (
        <Card className="w-full max-w-7xl shadow-sm border-none bg-background px-4">
            <CardHeader className="p-0 ">
                <CardTitle className="text-xl font-bold text-foreground">Billing History</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
                {/* Mobile Responsive Wrapper: overflow-x-auto allows horizontal scroll */}
                <div className="rounded-md border overflow-x-auto md:overflow-visible ">
                    <Table>
                        <TableHeader className="bg-muted/30">
                            <TableRow>
                                <TableHead className="font-semibold text-xs uppercase text-muted-foreground tracking-wider">
                                    Plan
                                </TableHead>
                                <TableHead className="font-semibold text-xs uppercase text-muted-foreground tracking-wider">
                                    Amount
                                </TableHead>
                                <TableHead className="font-semibold text-xs uppercase text-muted-foreground tracking-wider">
                                    Status
                                </TableHead>
                                <TableHead className="w-[150px] font-semibold text-xs uppercase text-muted-foreground tracking-wider">
                                    Date
                                </TableHead>
                                <TableHead className="w-[150px] font-semibold text-xs uppercase text-muted-foreground tracking-wider">
                                    Time
                                </TableHead>
                                {/* <TableHead className="text-right font-semibold text-xs uppercase text-muted-foreground tracking-wider">
                                    Invoice
                                </TableHead> */}
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {paymentHistory?.data!.map((transaction: PaymentHistoryResponse) => (
                                <TableRow key={transaction.id} className="hover:bg-muted/10">
                                    <TableCell className="text-sm text-foreground/90">{transaction.plan}</TableCell>
                                    <TableCell className="font-bold text-sm text-foreground/90">₹ {transaction.amount}</TableCell>
                                    <TableCell>{getStatusBadge(transaction.status)}</TableCell>
                                    <TableCell className="font-medium text-sm text-foreground/90">
                                        {formatDateDMY(transaction.createdAt)}
                                    </TableCell>
                                    <TableCell className="font-medium text-sm text-foreground/90">
                                        {formatToLocalTime(transaction.createdAt)}
                                    </TableCell>
                                    {/* <TableCell className="text-right">
                                        <a
                                            href="#"
                                            className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary/80 hover:underline transition-colors"
                                        >
                                            <FileText className="h-4 w-4" />
                                            {transaction.invoiceId}
                                        </a>
                                    </TableCell> */}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>

                <p className="pt-6 mx-auto w-fit cursor-pointer hover:underline  text-blue-600 hover:text-blue-800 transition-colors">
                    View More
                </p>
            </CardContent>
        </Card>
    );
}

export default BillingHistory;
