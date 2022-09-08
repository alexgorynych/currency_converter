import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

import popularCurrencies from "../../configs/popularСurrencies.json";

interface FavouritesState {
    location: string;
    currencies: string[];
}

const initialState: FavouritesState = {
    location: "RU",
    currencies: popularCurrencies,
};

const favouritesSlice = createSlice({
    name: "favourites",
    initialState,
    reducers: {
        setLocation(state, action) {
            state.location = action.payload;
        },
        setCurrencies(state, action) {
            state.currencies = action.payload;
        },
        addCurrency(state, action) {
            if (state.currencies.length < 4)
                state.currencies.push(action.payload);
        },
        deleteCurrency(state, action) {
            state.currencies.splice(action.payload, 1);
        },
    },
    extraReducers: {
        [HYDRATE](state, action) {
            return { ...state, ...action.payload.favourites };
        },
    },
});

export const favouritesActions = {
    setCurrencies: favouritesSlice.actions.setCurrencies,
    deleteCurrency: favouritesSlice.actions.deleteCurrency,
    addCurrency: favouritesSlice.actions.addCurrency,
    setLocation: favouritesSlice.actions.setLocation,
};

export default favouritesSlice.reducer;
