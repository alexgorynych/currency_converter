import { ICountry } from "../../models";
import { countryActions } from "../slices/country";

import countriesJSON from "../../configs/countries.json";

export const setCompanies = () => {
    const countries: ICountry[] = countriesJSON.countries;
    return countryActions.set(countries);
};
