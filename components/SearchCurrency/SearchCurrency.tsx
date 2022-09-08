import {
    ChangeEvent,
    FocusEvent,
    FC,
    useId,
    useState,
    useEffect,
    useRef,
} from "react";
import Fuse from "fuse.js";
import { useAppSelector } from "../../hooks/store";
import { useSearchCurrency } from "../../hooks/useSearch";
import { ICurrency } from "../../models";
import selector from "../../store/selectors";
import useDebounce from "../../hooks/useDebounce";

interface SearchCurrencyProps {
    onClick(currency: ICurrency): void;
    onBlur(evt: FocusEvent<HTMLDivElement>): void;
}

interface SearchState {
    value: string;
    searchList: Fuse.FuseResult<ICurrency>[];
}

export const SearchCurrency: FC<SearchCurrencyProps> = ({
    onClick,
    onBlur,
}: SearchCurrencyProps) => {
    const id = useId();
    const [state, setState] = useState<SearchState>({
        value: "",
        searchList: [],
    });
    const fuse = useSearchCurrency(useAppSelector(selector.currency.list));
    const options: Fuse.FuseSearchOptions = { limit: 10 };
    const ref = useRef<HTMLInputElement>(null);

    const debValue = useDebounce<string>(state.value);

    useEffect(() => {
        ref.current.focus();
    }, []);

    useEffect(
        () =>
            setState({
                ...state,
                searchList: fuse.search(state.value, options),
            }),
        [debValue]
    );

    const onChange = (evt: ChangeEvent<HTMLInputElement>) =>
        setState({ ...state, value: evt.target.value });

    return (
        <div className="search-curr" {...{ onBlur }}>
            <input type="text" value={state.value} {...{ onChange, ref }} />
            {state.searchList.length ? (
                <ul className="search-curr__list">
                    {state.searchList.map(({ item }, i) => (
                        <li key={`search-curr-${id}${i}`}>
                            <button
                                className="search-curr__btn"
                                onClick={() => onClick(item)}
                            >
                                {item.name}
                            </button>
                        </li>
                    ))}
                </ul>
            ) : (
                ""
            )}
        </div>
    );
};
