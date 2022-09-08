import Fuse from "fuse.js";
import { useState } from "react";
import { ICountry, ICurrency } from "../models";

export const useSearchCountry = (list: ICountry[]): Fuse<ICountry> => {
    const options: Fuse.IFuseOptions<ICountry> = { keys: ["name"] };
    const [fuse, _] = useState(new Fuse<ICountry>(list, options));
    return fuse;
};

export const useSearchCurrency = (list: ICurrency[]): Fuse<ICurrency> => {
    const options: Fuse.IFuseOptions<ICurrency> = {
        keys: ["name", "charCode"],
    };
    const [fuse, _] = useState(new Fuse<ICurrency>(list, options));
    return fuse;
};
