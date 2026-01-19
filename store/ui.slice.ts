
import { createSlice } from "@reduxjs/toolkit"

const appSlice = createSlice({
    name: 'ui',
    initialState: {
        accessToken: ''
        // menuIsVisible: false,
        // noProjectSeleted: true,
        // // deleteFor: '',
        // currentProjectName: null
    },
    reducers: {
        // toggleMenu(state) {
        //     state.menuIsVisible = !state.menuIsVisible
        // },
        // profileClick(state){
        //     state.isProfileClick = true
        // },
        // profileClose(state){
        //     state.isProfileClick = false
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

        // setAccessToken(state,action){
        //     state.token = action.payload
        // },


        // setProjectName(state, action){
        //     state.currentProjectName = action.payload
        // }
    }
})

export const appActions = appSlice.actions

export default appSlice