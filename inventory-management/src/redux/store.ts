import { combineReducers, configureStore } from "@reduxjs/toolkit";
import dataReducer from "./slices/data"

const rootReducer = combineReducers({
    dataReducer
})

export const store = configureStore({
    reducer: rootReducer
})