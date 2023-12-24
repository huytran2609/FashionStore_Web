import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isLoggedIn: false,
    current: {},
    token: '',
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, action) => {
            console.log(action.payload);
            state.isLoggedIn = action.payload.isLoggedIn;
            state.current = action.payload.userData;
            state.token = action.payload.token;
        },
    },
});

// Action creators are generated for each case reducer function
export const { login } = userSlice.actions;

export default userSlice.reducer;
