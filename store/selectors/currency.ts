import { AppState } from "..";
import { ICurrency } from "../../models";

const currency = {
    list: (state: AppState): ICurrency[] => state.currency,
};

export default currency;
