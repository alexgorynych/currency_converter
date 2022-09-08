import {
    ChangeEvent,
    FC,
    MutableRefObject,
    useEffect,
    useId,
    useRef,
    useState,
} from "react";
import Fuse from "fuse.js";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "../../hooks/store";
import { useSearchCountry } from "../../hooks/useSearch";
import selector from "../../store/selectors";
import { ICountry } from "../../models";
import { setLocation } from "../../store/actions";
import useDebounce from "../../hooks/useDebounce";

interface LocationState {
    focused: boolean;
    value: string;
    searchList: Fuse.FuseResult<ICountry>[];
}

export const Location: FC = () => {
    const id = useId();
    const dispatch = useAppDispatch();
    const [state, setState] = useState<LocationState>({
        focused: false,
        value: "",
        searchList: [],
    });
    const refInput: MutableRefObject<HTMLInputElement> = useRef(null);
    const country = useAppSelector(selector.favourites.location);
    const fuse = useSearchCountry(useAppSelector(selector.country.list));
    const options: Fuse.FuseSearchOptions = { limit: 10 };

    const debValue = useDebounce<string>(state.value);

    useEffect(
        () =>
            setState({
                ...state,
                searchList: fuse.search(state.value, options),
            }),
        [debValue]
    );

    const handleOnChange = (evt: ChangeEvent<HTMLInputElement>) =>
        setState({ ...state, value: evt.target.value });

    const hanleOnBlur = () => setState({ ...state, focused: false });

    const handleOnFocus = () => setState({ ...state, focused: true });

    const handleOnClick = (c: ICountry) => dispatch(setLocation(c));

    return (
        <div className="location">
            <div className="location__wrapper">
                <Image
                    src="/location.svg"
                    alt="location"
                    width={21}
                    height={21}
                />
                <input
                    ref={refInput}
                    type="text"
                    value={
                        state.focused || !country ? state.value : country.name
                    }
                    onChange={handleOnChange}
                    onFocus={handleOnFocus}
                    onBlur={hanleOnBlur}
                />
                {state.searchList.length ? (
                    <ul className="location__list">
                        {state.searchList.map(({ item }, i) => (
                            <li key={`loc-search-${id}${i}`}>
                                <button
                                    className="location__btn"
                                    onClick={() => handleOnClick(item)}
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
            <span>Валюта: {country ? country.charCode : ""}</span>
        </div>
    );
};
