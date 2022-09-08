import { ICountry, ICurrency } from "../../models";
import { favouritesActions } from "../slices/favourites";

export const setLocation = (country: ICountry) =>
    favouritesActions.setLocation(country.code);

export const setCurrencyCodes = (currencyCodes: string[]) =>
    favouritesActions.setCurrencies(currencyCodes);

export const addCurrency = (currency: ICurrency) =>
    favouritesActions.addCurrency(currency.charCode);

export const deleteCurrency = (index: number) =>
    favouritesActions.deleteCurrency(index);
