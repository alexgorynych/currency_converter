import { createSlice, PayloadAction, ThunkAction } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { ICountry } from "../../models";

type CountryState = ICountry[];

const initialState: CountryState = [];

const countrySlice = createSlice({
    name: "country",
    initialState,
    reducers: {
        setCountries(_state, action: PayloadAction<ICountry[]>) {
            return [...action.payload];
        },
    },
    extraReducers: {
        [HYDRATE](_state, action) {
            return [...action.payload.country];
        },
    },
});

export const countryActions = {
    set: countrySlice.actions.setCountries,
};

export default countrySlice.reducer;
