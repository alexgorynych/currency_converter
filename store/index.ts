import {
    Action,
    AnyAction,
    combineReducers,
    configureStore,
    ThunkAction,
    ThunkDispatch,
} from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";

import country from "./slices/country";
import currency from "./slices/currency";
import favourites from "./slices/favourites";

const rootReducer = combineReducers({
    country,
    currency,
    favourites,
});

export function makeStore() {
    return configureStore({
        reducer: rootReducer,
    });
}

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    AppState,
    unknown,
    Action
>;
export type AppThunkDispatch = ThunkDispatch<AppState, void, AnyAction>;

export const wrapper = createWrapper<AppStore>(makeStore);
