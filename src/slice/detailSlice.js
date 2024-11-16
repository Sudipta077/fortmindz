import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';
export const fetchDetails = createAsyncThunk('fetchDetails', async (id) => {
    const res = await axios.get(`https://interviewtesting.onrender.com/v1/users/employee/${id}`);
    return res.data;
})
export const detailSlice = createSlice({
    name: 'details',
    initialState: {
        isLoading: false,
        data: null,
        isError: false
    },
    extraReducers: (builder) => {
        builder.addCase(fetchDetails.fulfilled, (state, action) => {
            state.isLoading = false
            state.data = action.payload
            // console.log("data ------>", action.payload);

            
        });
        builder.addCase(fetchDetails.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(fetchDetails.rejected, (state, action) => {
            state.isError = true;
            console.log("ERROR is ------>", action.payload);
        });
    },
   
})
export default detailSlice.reducer