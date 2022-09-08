import Image from "next/image";
import { FC, useId, useState, FocusEvent } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/store";
import { ICurrency } from "../../models";
import { addCurrency, deleteCurrency } from "../../store/actions";

import selector from "../../store/selectors";
import { SearchCurrency } from "../SearchCurrency/SearchCurrency";

export const ExchangeRates: FC = () => {
    const id = useId();
    const [state, setState] = useState<
        undefined | ReturnType<typeof SearchCurrency>
    >(undefined);
    const dispatch = useAppDispatch();
    const locCurrency = useAppSelector(selector.favourites.currencyByLocation);
    const currencies = useAppSelector(selector.favourites.currencies);

    const calc = (c: ICurrency): string => {
        if (locCurrency) return (c.value / locCurrency.value).toFixed(4);
        else return "";
    };

    const handleOnDelete = (index: number) => dispatch(deleteCurrency(index));

    const handleOnAdd = (currency: ICurrency) =>
        dispatch(addCurrency(currency));

    const setSearch = () => {
        setState(<SearchCurrency onClick={handleOnAdd} onBlur={delSearch} />);
    };
    const delSearch = (evt: FocusEvent<HTMLDivElement>) => {
        if (!evt.currentTarget.contains(evt.relatedTarget)) setState(undefined);
    };

    const showAdd = () => {
        if (currencies.length < 4) {
            const el = state ? (
                state
            ) : (
                <button className="rates__btn-add" onClick={setSearch}></button>
            );
            return (
                <tr>
                    <td colSpan={3}>{el}</td>
                </tr>
            );
        } else return "";
    };

    return (
        <section className="rates">
            <table>
                <thead>
                    <tr>
                        <th>Валюта</th>
                        <th>Курс</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {currencies.map((c, i) => (
                        <tr key={`ER-li${id}-${i}`}>
                            <td>{c.name}</td>
                            <td>{calc(c)}</td>
                            <td>
                                <button
                                    className="rates__btn-del"
                                    onClick={() => handleOnDelete(i)}
                                ></button>
                            </td>
                        </tr>
                    ))}
                    {showAdd()}
                </tbody>
            </table>
        </section>
    );
};
