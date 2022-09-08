import { ChangeEvent, useId, useState } from "react";
import { useAppSelector } from "../../hooks/store";
import selector from "../../store/selectors";

export const Converter = () => {
    const id = useId();
    const [state, setState] = useState({
        from: { id: 0, value: 0 },
        in: { id: 1, value: 0 },
    });
    const currencies = useAppSelector(selector.currenciesUsed);

    const calcFrom = (inV = state.in.value, inId = state.in.id) => {
        const inv = currencies[inId].value;
        const fromv = currencies[state.from.id].value;
        return Number.parseFloat(((inv / fromv) * inV).toFixed(4));
    };

    const calcIn = (
        fromV = state.from.value,
        fromId = state.from.id,
        inId = state.in.id
    ) => {
        const fromv = currencies[fromId].value;
        const inv = currencies[inId].value;
        return Number.parseFloat(((fromv / inv) * fromV).toFixed(4));
    };

    const changedFrom = (evt: ChangeEvent<HTMLInputElement>) => {
        const str = (evt.target.value ? evt.target.value : 0) as string;
        setState({
            from: {
                ...state.from,
                value: Number.parseFloat(str),
            },
            in: {
                ...state.in,
                value: calcIn(Number.parseFloat(str)),
            },
        });
    };

    const changedIn = (evt: ChangeEvent<HTMLInputElement>) => {
        const str = (evt.target.value ? evt.target.value : 0) as string;
        setState({
            in: {
                ...state.in,
                value: Number.parseFloat(str),
            },
            from: {
                ...state.from,
                value: calcFrom(Number.parseFloat(str)),
            },
        });
    };

    const setIdFrom = (id: number) =>
        setState({
            from: {
                ...state.from,
                id: id,
            },
            in: {
                ...state.in,
                value: calcIn(undefined, id),
            },
        });

    const setIdIn = (id: number) =>
        setState({
            ...state,
            in: {
                id: id,
                value: calcIn(undefined, undefined, id),
            },
        });

    return (
        <section className="converter">
            <div className="converter__wrapper">
                <ul>
                    {currencies.map((currency, i) => (
                        <li key={`used-curr-${id}1${i}`}>
                            <button
                                className={`converter__btn ${
                                    state.from.id === i
                                        ? "converter__btn-checked"
                                        : ""
                                }`}
                                onClick={() => setIdFrom(i)}
                            >
                                {currency.charCode}
                            </button>
                        </li>
                    ))}
                </ul>
                <input
                    type="text"
                    value={state.from.value}
                    onChange={changedFrom}
                />
            </div>
            <img
                className="converter__img"
                src="/exchange.svg"
                alt="exchange"
            />
            <div className="converter__wrapper">
                <ul>
                    {currencies.map((currency, i) => (
                        <li key={`used-curr-${id}2${i}`}>
                            <button
                                className={`converter__btn ${
                                    state.in.id === i
                                        ? "converter__btn-checked"
                                        : ""
                                }`}
                                onClick={() => setIdIn(i)}
                            >
                                {currency.charCode}
                            </button>
                        </li>
                    ))}
                </ul>
                <input
                    type="text"
                    value={state.in.value}
                    onChange={changedIn}
                />
            </div>
        </section>
    );
};
