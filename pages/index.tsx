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
import { setCurrencyCodes } from "../store/actions/favourites";

export default function Home({ test }) {
    const currencyCodes = useAppSelector(selector.favourites.currencyCodes);
    console.log(test);
    useEffect(() => {
        setCookie(cookieKeys.CURRENCY_CODES, JSON.stringify(currencyCodes));
    }, [currencyCodes]);

    return (
        <>
            <Converter />
            <ExchangeRates />
            <code>{JSON.stringify(test)}</code>
        </>
    );
}

export const getServerSideProps: GetServerSideProps =
    wrapper.getServerSideProps((store) => async ({ req }) => {
        const dispatch = store.dispatch as AppThunkDispatch;
        await dispatch(setCurrencies());
        dispatch(setCompanies());
        console.log(req);
        const cookies: Object = req.cookies;
        if (cookies.hasOwnProperty(cookieKeys.CURRENCY_CODES)) {
            const currencyCodes: string[] = JSON.parse(
                cookies[cookieKeys.CURRENCY_CODES]
            );
            dispatch(setCurrencyCodes(currencyCodes));
        }

        return {
            props: {
                test: {
                    t: req.url,
                    t1: req.rawHeaders,
                    t2: req.headers.location ? req.headers.location : "",
                    t3: req.headers.host,
                },
            },
        };
    });
