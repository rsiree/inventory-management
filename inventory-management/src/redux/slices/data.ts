import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface intialStateProps {
    data: Array<Object>,
    isLoading: Boolean,
    categoryData: any,
    outOfStock: number,
    totalStoreValue: 0
}

const initialState: intialStateProps = {
    data: [],
    isLoading: false,
    categoryData: null,
    outOfStock: 0,
    totalStoreValue: 0
}

// const url = process.env.BASE_URL || 'https://dev-0tf0hinghgjl39z.api.raw-labs.com/inventory';
export const fetchData = createAsyncThunk(
    'fetchData',
    async () => {
        const response = await axios.get('');
        // console.log(response);
        // const data = response.data;
        const data = [{ "name": "Bluetooth", "category": "Electronic", "value": "$150", "quantity": 5, "price": "$30" }, { "name": "Edifier M43560", "category": "Electronic", "value": "0", "quantity": 0, "price": "$0" }, { "name": "Sony 4k ultra 55 inch TV", "category": "Electronic", "value": "$1190", "quantity": 17, "price": "$70" }, { "name": "Samsumg 55 inch TV", "category": "Electronic", "value": "$600", "quantity": 50, "price": "$12" }, { "name": "samsumg S34 Ultra", "category": "phone", "value": "$0", "quantity": 0, "price": "$0" }]

        let out_of_stock = 0;
        const categories = {} as any;
        let total_store_value = 0;

        for (let i = 0; i < data?.length; i++) {
            if (data[i]?.quantity === 0) out_of_stock++;

            for (let key in data[i]) {
                if (key === 'value') {
                    let store_value = data[i]?.value?.split("$")?.[1] || data[i]?.value;
                    total_store_value += Number(store_value);
                }

                if (key === 'category') {
                    let categoryName = data[i]?.category;
                    if (categories[categoryName] === undefined) categories[categoryName] = 1;
                    else categories[categoryName] += 1
                }
            }
        }

        return { data, categories, out_of_stock, total_store_value };
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
                state.isLoading = true;
            })
            .addCase(fetchData.fulfilled, (state: any, action: any) => {
                const { data, categories, out_of_stock, total_store_value } = action?.payload;
                state.isLoading = false;
                state.data = data;
                state.categoryData = categories;
                state.outOfStock = out_of_stock;
                state.totalStoreValue = total_store_value
            })
            .addCase(fetchData.rejected, (state: any, action: any) => {
                state.isLoading = false
            })
    }
})

export default dataSlice.reducer