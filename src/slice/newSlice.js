import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';
export const createUser = createAsyncThunk('createUser', async (formData) => {

    const res = await axios.post(`https://interviewtesting.onrender.com/v1/users/employee/create`,formData);
    return res.data;
})
export const newSlice = createSlice({
    name: 'update',
    initialState: {
        isLoading: false,
        data: null,
        isError: false
    },
    extraReducers: (builder) => {
        builder.addCase(createUser.fulfilled, (state, action) => {
            state.isLoading = false
            state.data = action.payload
            console.log("update ------>", action.payload);

            
        });
        builder.addCase(createUser.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(createUser.rejected, (state, action) => {
            state.isError = true;
            console.log("ERROR is ------>", action.payload);
        });
    },
   
})
export default newSlice.reducer