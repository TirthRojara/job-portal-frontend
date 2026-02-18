import type { Metadata } from "next";
import { Inter, Source_Serif_4, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import AppProvider from "@/provider/index.provider";
import Script from "next/script";
import ReduxProvider from "@/provider/redux.provider";

export const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
});

export const sourceSerif = Source_Serif_4({
    subsets: ["latin"],
    variable: "--font-source-serif",
});

export const jetbrainsMono = JetBrains_Mono({
    subsets: ["latin"],
    variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
    title: "Job portal",
    description: "Get your job with easy apply",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className=" light">
            <body
                className={`${inter.variable} ${sourceSerif.variable} ${jetbrainsMono.variable} antialiased`}
                //   className={`${aclonica.variable} ${arbutus.variable} ${jetbrainsMono.variable} antialiased`}
            >
                <ReduxProvider>
                    <AppProvider>{children}</AppProvider>
                </ReduxProvider>
                <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="afterInteractive" />
            </body>
        </html>
    );
}
