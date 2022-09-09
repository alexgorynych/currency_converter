import { GetServerSideProps } from "next";
import { useEffect } from "react";
import { ExchangeRates } from "../components/ExchangeRates/ExchangeRates";
import { Converter } from "../components/index";
import { AppThunkDispatch, wrapper } from "../store";

import { setCompanies } from "../store/actions";
import { setCurrencies } from "../store/actions";
import { useAppSelector } from "../hooks/store";
import selector from "../store/selectors";
import { cookieKeys, setCookie } from "../cookies";
import { setCurrencyCodes, setRealLocation } from "../store/actions/favourites";

export default function Home() {
    const currencyCodes = useAppSelector(selector.favourites.currencyCodes);

    useEffect(() => {
        setCookie(cookieKeys.CURRENCY_CODES, JSON.stringify(currencyCodes));
    }, [currencyCodes]);

    return (
        <>
            <Converter />
            <ExchangeRates />
        </>
    );
}

export const getServerSideProps: GetServerSideProps =
    wrapper.getServerSideProps((store) => async ({ req }) => {
        const dispatch = store.dispatch as AppThunkDispatch;
        await dispatch(setCurrencies());
        dispatch(setCompanies());

        const cookies: Object = req.cookies;
        if (cookies.hasOwnProperty(cookieKeys.CURRENCY_CODES)) {
            const currencyCodes: string[] = JSON.parse(
                cookies[cookieKeys.CURRENCY_CODES]
            );
            dispatch(setCurrencyCodes(currencyCodes));
        }

        const indexIp =
            req.rawHeaders.findIndex((el) => el === "x-real-ip") + 1;
        if (indexIp) await dispatch(setRealLocation(req.rawHeaders[indexIp]));

        return {
            props: {},
        };
    });
