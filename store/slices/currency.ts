import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { ICurrency } from "../../models";

type CurrencyState = ICurrency[];

const initialState: CurrencyState = [];

const currencySlice = createSlice({
    name: "currency",
    initialState,
    reducers: {
        setCurrencies(_state, action: PayloadAction<ICurrency[]>) {
            return [...action.payload];
        },
    },
    extraReducers: {
        [HYDRATE](_state, action) {
            return [...action.payload.currency];
        },
    },
});

export const currencyActions = {
    set: currencySlice.actions.setCurrencies,
};

export default currencySlice.reducer;
