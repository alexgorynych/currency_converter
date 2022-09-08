import { AppState } from "..";
import { ICurrency } from "../../models";
import favourites from "./favourites";
import country from "./country";
import currency from "./currency";

const selector = {
    currenciesUsed: (state: AppState): ICurrency[] => {
        const currencies = selector.favourites.currencies(state);
        const locCurrency = selector.favourites.currencyByLocation(state);
        if (locCurrency) currencies.unshift(locCurrency);
        return currencies;
    },
    country,
    currency,
    favourites,
};

export default selector;
