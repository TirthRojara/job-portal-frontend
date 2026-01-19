import { configureStore } from "@reduxjs/toolkit";
import appSlice from "./ui.slice";

const store = configureStore({
    reducer: {
        app: appSlice.reducer,
    }
})

export default store

