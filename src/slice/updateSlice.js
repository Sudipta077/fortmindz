import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';
export const fetchUpdate = createAsyncThunk('fetchUpdate', async (formData) => {

    const res = await axios.put(`https://interviewtesting.onrender.com/v1/users/employee-update/${formData.id}`,formData);
    return res.data;
})
export const updateSlice = createSlice({
    name: 'update',
    initialState: {
        isLoading: false,
        data: null,
        isError: false
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUpdate.fulfilled, (state, action) => {
            state.isLoading = false
            state.data = action.payload
            console.log("update ------>", action.payload);

            
        });
        builder.addCase(fetchUpdate.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(fetchUpdate.rejected, (state, action) => {
            state.isError = true;
            console.log("ERROR is ------>", action.payload);
        });
    },
   
})
export default updateSlice.reducer