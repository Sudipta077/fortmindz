import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';
export const fetchUser = createAsyncThunk('fetchUser', async () => {
    const res = await axios.get('https://interviewtesting.onrender.com/v1/users/employee/list');
    return res.data;
})
export const userSlice = createSlice({
    name: 'user',
    initialState: {
        isLoading: false,
        data: null,
        isError: false
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUser.fulfilled, (state, action) => {
            state.isLoading = false
            state.data = action.payload
        });
        builder.addCase(fetchUser.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(fetchUser.rejected, (state, action) => {
            state.isError = true;
            console.log("ERROR is ------>", action.payload);
        });
    },
   
})
export default userSlice.reducer