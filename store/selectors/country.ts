import { AppState } from "..";
import { ICountry } from "../../models";

const country = {
    list: (state: AppState): ICountry[] => state.country,
};

export default country;
