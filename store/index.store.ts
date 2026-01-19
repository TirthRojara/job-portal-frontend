import { configureStore } from "@reduxjs/toolkit";
import appSlice from "./app.slice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

const store = configureStore({
    reducer: {
        app: appSlice.reducer,
    },
});

// 1. Export the types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// 2. Export the typed hooks
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;

// ###  How to use in a component  ###

// => selector
// const token = useAppSelector((state) => state.app.accessToken);

// => dispatch
// const dispatch = useAppDispatch();

//     const handleUpdateToken = (newToken: string) => {
//         dispatch(appActions.setAccessToken(newToken));
//     };

// ###  How to use in non-component files (e.g., lib/axios/client.ts)  ###

// => selector
// const accessToken = store.getState().app.accessToken;

// => dispatch
// const updateTokenInRedux = (newToken: string) => {
//     store.dispatch(appActions.setAccessToken(newToken));
// };
