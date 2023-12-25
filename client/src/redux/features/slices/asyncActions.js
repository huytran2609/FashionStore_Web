import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiGetCurrent } from '~/apis/user';

export const getCurrent = createAsyncThunk('user/current', async (data, { rejectWithValue }) => {
    const response = await apiGetCurrent();
    if (!response.success) return rejectWithValue(response);
    return response.response;
});
