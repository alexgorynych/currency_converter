import { AppState } from "..";
import { ICountry, ICurrency } from "../../models";

const favourites = {
    location: (state: AppState): ICountry =>
        state.country.find((c) => state.favourites.location === c.code),

    currencyCodes: (state: AppState): string[] => state.favourites.currencies,

    currencies: (state: AppState): ICurrency[] =>
        state.favourites.currencies.map((code) =>
            state.currency
                .filter((currency) =>
                    state.favourites.currencies.find(
                        (code) => code === currency.charCode
                    )
                )
                .find((c) => code === c.charCode)
        ),

    currencyByLocation: (state: AppState): ICurrency =>
        state.currency.find(
            (currency) =>
                state.country.find((c) => c.code === state.favourites.location)
                    .charCode === currency.charCode
        ),
};

export default favourites;
