import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface intialStateProps {
    data: Array<Object>,
    isLoading: Boolean,
    categoryData: any,
    outOfStock: number,
    totalStoreValue: number,
    totalProducts: number
}

const initialState: intialStateProps = {
    data: [],
    isLoading: false,
    categoryData: null,
    outOfStock: 0,
    totalStoreValue: 0,
    totalProducts: 0
}

const url: string = "https://dev-0tf0hinghgjl39z.api.raw-labs.com/inventory";

// fetching data and storing the all the required data

export const fetchData = createAsyncThunk(
    'fetchData',
    async () => {
        const response = await axios.get(url);
        const data = response.data;
        // const data = [{ "name": "Bluetooth", "category": "Electronic", "value": "$150", "quantity": 5, "price": "$30" }, { "name": "Edifier M43560", "category": "Electronic", "value": "0", "quantity": 0, "price": "$0" }, { "name": "Sony 4k ultra 55 inch TV", "category": "Electronic", "value": "$1190", "quantity": 17, "price": "$70" }, { "name": "Samsumg 55 inch TV", "category": "Electronic", "value": "$600", "quantity": 50, "price": "$12" }, { "name": "samsumg S34 Ultra", "category": "phone", "value": "$0", "quantity": 0, "price": "$0" }]

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
        deleteProduct: (state: any, action: PayloadAction<any>) => {
            let data = [...state.data];
            state.data = data?.filter((_: any, index: number) => index !== action?.payload?.index);
        },
        disableProduct: (state: any, action: PayloadAction<any>) => {
            let { index, isDisabled } = action?.payload;
            let data = [...state.data];
            state.data = data?.map((item: any, ind: number) => ind === index ? { ...item, 'isDisabled': isDisabled } : item);
        },
        updateProduct: (state: any, action: PayloadAction<any>) => {
            const { item, index } = action?.payload;
            let data = [...state.data];
            state.data = data?.map((product: any, ind: number) => ind === index ? item : product);


        },
        getInventoryStats: (state: any) => {
            let data = [...state.data];
            let out_of_stock = 0;
            const categories = {} as any;
            let total_store_value = 0;
            let total_products = data?.length;

            for (let i = 0; i < data?.length; i++) {

                // inventory stats is counted for the available products
                if (!data[i]?.isDisabled) {

                    Number(data[i]?.quantity) === 0 && out_of_stock++;

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

                //total products only if product is not disabled
                data[i]?.isDisabled && total_products--;
            }
            state.outOfStock = out_of_stock;
            state.totalStoreValue = total_store_value;
            state.categoryData = categories;
            state.totalProducts = total_products
        }
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
                state.totalStoreValue = total_store_value;
                state.totalProducts = data?.length;
            })
            .addCase(fetchData.rejected, (state: any, action: any) => {
                state.isLoading = false
            })
    }
})

export const {
    deleteProduct, //to delete a product
    disableProduct, // to disable a product
    updateProduct, // to update a product
    getInventoryStats // to get the inventory stats when ever any update is formed on the product
} = dataSlice.actions

export default dataSlice.reducer