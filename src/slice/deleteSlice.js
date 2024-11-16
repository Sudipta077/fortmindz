import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';
export const deleteUser = createAsyncThunk('deleteUser', async (id) => {

    console.log("id----->",id);

    const res = await axios.delete(`https://interviewtesting.onrender.com/v1/users/employee-remove/${id}`);
    return res.data;
})
export const deleteSlice = createSlice({
    name: 'delete',
    initialState: {
        isLoading: false,
        data: null,
        isError: false
    },
    extraReducers: (builder) => {
        builder.addCase(deleteUser.fulfilled, (state, action) => {
            state.isLoading = false
            state.data = action.payload
            console.log("update ------>", action.payload);

            
        });
        builder.addCase(deleteUser.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(deleteUser.rejected, (state, action) => {
            state.isError = true;
            console.log("ERROR is ------>", action.payload);
        });
    },
   
})
export default deleteSlice.reducer