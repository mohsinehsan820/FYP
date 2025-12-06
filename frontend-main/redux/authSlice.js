import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    token: null,
    isAuthenticated: false,
    user: null,
    loading: false,
    isInitialized: false
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            state.token = action.payload.token;
            state.user = action.payload.user;
            state.isAuthenticated = true;

            localStorage.setItem('token', action.payload.token);
            localStorage.setItem('user', JSON.stringify(action.payload.user));
        },
        logout: (state) => {
            state.token = null;
            state.user = null;
            state.isAuthenticated = false;

            localStorage.removeItem('token');
            localStorage.removeItem('user');
        },
        setInitialized: (state) => {
            state.isInitialized = true;
        }
    }
});

export const { login, logout, setInitialized } = authSlice.actions;
export default authSlice.reducer;
