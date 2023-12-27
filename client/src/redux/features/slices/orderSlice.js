import { createSlice } from '@reduxjs/toolkit';
import { getCurrent } from './asyncActions';

const initialState = {
    products: [
        {
            product: { type: mongoose.Types.ObjectId, ref: 'Product' },
            count: Number,
            color: String,
        },
    ],
    status: {
        type: String,
        default: 'Processing',
        enum: ['Cancelled', 'Processing', 'Succeed'],
    },
    orderBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
    coupon: {
        type: mongoose.Types.ObjectId,
        ref: 'Coupon',
    },
    totalPrice: Number,
};

export const orderSlice = createSlice({});

// Action creators are generated for each case reducer function
export const {} = orderSlice.actions;

export default orderSlice.reducer;
