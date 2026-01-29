"use client";
import { appActions } from "@/store/app.slice";
import { useAppDispatch, useAppSelector } from "@/store/index.store";
import { useEffect } from "react";

export default function ThemeEffect() {
    const isDarkTheme = useAppSelector((state) => state.app.isDarkTheme);
    const dispatch = useAppDispatch();

    // 1. INITIALIZE: Read from LocalStorage when the app starts
    useEffect(() => {
        // Check if we are in the browser
        if (typeof window !== "undefined") {
            const storedTheme = localStorage.getItem("app-theme");

            // If storage says "dark" but Redux says "light", update Redux
            if (storedTheme === "dark" && !isDarkTheme) {
                dispatch(appActions.setIsDardTheme(true));
            }
            // If storage says "light" but Redux says "dark", update Redux
            else if (storedTheme === "light" && isDarkTheme) {
                dispatch(appActions.setIsDardTheme(true));
            }
        }
    }, [dispatch]); // Run once on mount

    // 2. SYNCHRONIZE: Update DOM & Storage whenever Redux changes
    useEffect(() => {
        const root = document.documentElement;

        if (isDarkTheme) {
            root.classList.add("dark");
            root.classList.remove("light");
            localStorage.setItem("app-theme", "dark"); // ✅ Save to storage
        } else {
            root.classList.add("light");
            root.classList.remove("dark");
            localStorage.setItem("app-theme", "light"); // ✅ Save to storage
        }
    }, [isDarkTheme]);

    return null;
}
