import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
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
            state.user = action.payload;
            state.accessToken = action.payload.access_token;
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
            state.accessToken = '';
        },
    },
});

const { reducer, actions } = authSlice;

export const {
    setCredentials, setIsLoading,
    logout, setRefreshedData,
} = actions;

export default reducer;