import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface intialStateProps {

}

const initialState: intialStateProps = {

}

export const fetchData = createAsyncThunk(
    'fetchData',
    async () => {
        const response = await axios.get('')
    }
)

export const dataSlice = createSlice({
    name: 'dataSlice',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchData.pending, (state: any, action: any) => {

            })
            .addCase(fetchData.fulfilled, (state: any, action: any) => {

            })
            .addCase(fetchData.rejected, (state: any, action: any) => {

            })
    }
})

export default dataSlice.reducer