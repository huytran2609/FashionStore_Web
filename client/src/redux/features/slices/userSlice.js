import { createSlice } from '@reduxjs/toolkit';
import { getCurrent } from './asyncActions';

const initialState = {
    isLoggedIn: false,
    current: null,
    token: '',
    loading: false,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, action) => {
            state.isLoggedIn = action.payload.isLoggedIn;
            state.token = action.payload.token;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCurrent.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(getCurrent.fulfilled, (state, action) => {
                state.loading = false;
                state.current = action.payload;
            })
            .addCase(getCurrent.rejected, (state, action) => {
                state.loading = false;
                state.current = null;
            });
    },
});

// Action creators are generated for each case reducer function
export const { login } = userSlice.actions;

export default userSlice.reducer;
