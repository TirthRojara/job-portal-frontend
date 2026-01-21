import { createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice({
    name: "app",
    initialState: {
        accessToken: "",
        resetToken: "",
        role: "",
    },
    reducers: {
        setAccessToken(state, action) {
            state.accessToken = action.payload;
        },
        setResetToken(state, action) {
            state.resetToken = action.payload;
        },
        setRole(state, action) {
            state.role = action.payload;
        }

        // toggleMenu(state) {
        //     state.menuIsVisible = !state.menuIsVisible
        // },
        // profileClick(state){
        //     state.isProfileClick = true
        // },
        // },

        // addIconProject(state) {
        //     state.noProjectSeleted = true
        //     // state.isProjectSeleted = false
        //     state.isAddProjectClick = false
        // },

    },
});

export const appActions = appSlice.actions;

export default appSlice;
