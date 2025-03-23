import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    userDetails: null,
    accessToken: '',
    isLoggedIn: false,
    loading: false,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            state.isLoggedIn = true;
            state.loading = false;
            state.user = action.payload.user;
            state.accessToken = action.payload.access_token;
        },
        setUserDetails: (state, action) => {
            state.userDetails = action.payload;
            },
        setRefreshedData: (state, action) => {
            const user = state?.user ?? {};
            state.user = { ...user, ...action?.payload };
            state.accessToken = action?.payload?.access_token;
        },
        setIsLoading: (state, action) => {
            state.loading = action.payload;
        },
        logout: (state) => {
            state.isLoggedIn = false;
            state.loading = false;
            state.user = null;
            state.userDetails=null;
            state.accessToken = '';
        },
    },
});

const { reducer, actions } = authSlice;

export const {
    setUserDetails,
    setCredentials, 
    setIsLoading,
    setRefreshedData,
    logout, 
} = actions;

export default reducer;