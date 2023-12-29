import { createSlice } from '@reduxjs/toolkit';
import { getCurrent } from './asyncActions';

const initialState = {
    isLoggedIn: false,
    current: null,
    currentCart: [],
    totalPrice: 0,
    token: '',
    loading: false,
    isToastVisible: true,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, action) => {
            state.isLoggedIn = action.payload.isLoggedIn;
            state.token = action.payload.token;
            state.current = action.payload.userData;
            state.isToastVisible = true;
        },
        logout: (state, action) => {
            state.isLoggedIn = false;
            state.token = null;
            state.current = null,
            state.currentCart = null,
            state.isToastVisible = true;
        },
        setToastVisibility: (state, action) => {
            state.isToastVisible = false;
        },
        updateCart: (state, action) => {
            const {pid, quantity, color} = action.payload;
            // console.log({pid, quantity, color});
            const updatingCart = JSON.parse(JSON.stringify(state.currentCart));
            const updatedCart = updatingCart.map(item => {
                if (item.product._id === pid && item.color[0] === color[0]) {
                    return {...item, quantity}
                }else {
                    return item;
                }
            });
            state.totalPrice = updatedCart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
            state.currentCart = updatedCart;
            // console.log(updatedCart);
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCurrent.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(getCurrent.fulfilled, (state, action) => {
                state.loading = false;
                state.current = action.payload;
                state.currentCart = action.payload.cart;
            })
            .addCase(getCurrent.rejected, (state, action) => {
                state.loading = false;
                state.current = null;
            });
    },
});

// Action creators are generated for each case reducer function
export const { login, logout, setToastVisibility, updateCart } = userSlice.actions;

export default userSlice.reducer;
