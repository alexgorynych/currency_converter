import { AppDispatch, AppThunk } from "..";
import { currency } from "../../api/currency";
import { currencyActions } from "../slices/currency";

export const setCurrencies =
    (): AppThunk =>
    async (dispatch: AppDispatch): Promise<void> => {
        const currencies = await currency.get();
        dispatch(currencyActions.set(currencies));
    };
