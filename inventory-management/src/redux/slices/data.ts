import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { isDisabled } from "@testing-library/user-event/dist/utils";
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
        deleteProduct: (state: any, action: PayloadAction<any>) => {
            let { category, quantity, value, isDisabled } = action?.payload?.item;
            let data = [...state.data];
            state.data = data?.filter((_: any, index: number) => index !== action?.payload?.index);
            state.outOfStock = quantity === 0 ? isDisabled ? state.outOfStock : state.outOfStock - 1 : state.outOfStock;

            for (let key in state.categoryData) {
                let value = state.categoryData[category]
                if (key?.toLocaleLowerCase() === category?.toLocaleLowerCase()) {
                    value > 1 ? state.categoryData[category]-- : state.categoryData[category] = 0;
                }
            };
            state.totalProducts = isDisabled ? state.totalProducts : state.totalProducts - 1;
            state.totalStoreValue = isDisabled ? state.totalStoreValue : state.totalStoreValue - Number(value?.split("$")?.[1] || value);
        },
        disableProduct: (state: any, action: PayloadAction<any>) => {
            let { index, isDisabled, item } = action?.payload;
            let { category, quantity, value } = item;
            let data = [...state.data];
            state.data = data?.map((item: any, ind: number) => ind === index ? { ...item, 'isDisabled': isDisabled } : item);
            // state.outOfStock = quantity === 0 ? state.outOfStock - 1 : state.outOfStock;
            let storeValue = value?.split("$")?.[1] || value;
            state.totalStoreValue = isDisabled ? state.totalStoreValue - Number(storeValue) : state.totalStoreValue + Number(storeValue);
            for (let key in state.categoryData) {
                let value = state.categoryData[category]
                if (key?.toLocaleLowerCase() === category?.toLocaleLowerCase()) {
                    isDisabled ?
                        value > 1 ?
                            state.categoryData[category]--
                            : state.categoryData[category] = 0
                        :
                        value > 0 ?
                            state.categoryData[category]++
                            : state.categoryData[category] = 1;
                }
            }
            state.outOfStock = quantity === 0 ? isDisabled ? state.outOfStock - 1 : state.outOfStock + 1 : state.outOfStock;
            state.totalProducts = isDisabled ? state.totalProducts - 1 : state.totalProducts + 1
        },
        updateProduct: (state: any, action: PayloadAction<any>) => {
            const { item, index } = action?.payload;
            const { category, value, quantity } = item;
            let data = [...state.data];
            let existingData = state.data?.find((_: any, ind: number) => ind === index);
            let existingCategory = existingData?.category
            state.data = data?.map((product: any, ind: number) => ind === index ? item : product);

            let flag = false;
            for (let key in state.categoryData) {
                if ((key?.toLocaleLowerCase() === category?.toLocaleLowerCase()) && (existingCategory?.toLowerCase() === category?.toLowerCase())) {
                    flag = true;
                    break;
                }
            }

            if (flag) {
                state.categoryData = { ...state.categoryData, [category]: state.categoryData[category] === 0 ? 1 : state.categoryData[category] }
            }
            else {
                state.categoryData = {
                    ...state.categoryData,
                    [existingCategory]: state.categoryData[existingCategory] === 0 ? 0 : state.categoryData[existingCategory] - 1,
                    [category]: 1
                }
            }

            state.outOfStock = existingData?.quantity > 0 ?
                quantity > 0 ?
                    state.outOfStock
                    : state.outOfStock + 1
                : quantity > 0 ?
                    state.outOfStock - 1
                    : state.outOfStock
                ;

            state.totalStoreValue = state.totalStoreValue - Number(existingData?.value?.split("$")?.[1] || existingData?.value) + Number(value?.split("$")?.[1] || value)
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
                state.totalProducts = data?.length
            })
            .addCase(fetchData.rejected, (state: any, action: any) => {
                state.isLoading = false
            })
    }
})

export const {
    deleteProduct,
    disableProduct,
    updateProduct
} = dataSlice.actions

export default dataSlice.reducer