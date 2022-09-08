import { AppProps } from "next/app";
import Head from "next/head";

import { Header } from "../components";
import { wrapper } from "../store";

import "../styles/main.scss";

function App({ Component, pageProps }: AppProps): JSX.Element {
    return (
        <>
            <Head>
                <title>Currency Converter</title>
            </Head>
            <Header />
            <main className="app-main">
                <Component {...pageProps} />
            </main>
        </>
    );
}

export default wrapper.withRedux(App);
