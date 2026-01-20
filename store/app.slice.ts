import { createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice({
    name: "app",
    initialState: {
        accessToken: "",
        // menuIsVisible: false,
        // currentProjectName: null
    },
    reducers: {
        setAccessToken(state, action) {
            state.accessToken = action.payload;
        },

        // toggleMenu(state) {
        //     state.menuIsVisible = !state.menuIsVisible
        // },
        // profileClick(state){
        //     state.isProfileClick = true
        // },
        // },
        // toggleEditProfile(state, action) {
        //     state.showEditProfileModal = action.payload
        // },
        // addIconProject(state) {
        //     state.noProjectSeleted = true
        //     // state.isProjectSeleted = false
        //     state.isAddProjectClick = false
        // },

        // deleteFor(state, action){
        //     state.deleteFor = action.payload
        // },

        // setProjectName(state, action){
        //     state.currentProjectName = action.payload
        // }
    },
});

export const appActions = appSlice.actions;

export default appSlice;
