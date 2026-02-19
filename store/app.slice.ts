import { ActiveChat } from "@/features/dashboard/components/chat/chat-page-recruiter";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const appSlice = createSlice({
    name: "app",
    initialState: {
        accessToken: "",
        resetToken: "",
        role: "",
        companyId: "",
        isDarkTheme: false,
        activeChat: null as ActiveChat | null,
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
        },
        setCompanyId(state, action) {
            state.companyId = action.payload;
        },
        setIsDardTheme(state, action) {
            state.isDarkTheme = action.payload;
        },

        // CHAT

        setActiveChat: (state, action: PayloadAction<ActiveChat>) => {
            state.activeChat = action.payload;
        },
        clearActiveChat: (state) => {
            state.activeChat = null;
        },

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
