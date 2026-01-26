import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    products: [],
    status: 'Processing',
    orderBy: null,
    coupon: null,
    totalPrice: 0,
};

export const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {},
});

// Action creators are generated for each case reducer function
// eslint-disable-next-line no-empty-pattern
export const {} = orderSlice.actions;

export default orderSlice.reducer;
