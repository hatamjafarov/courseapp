import "../styles/globals.css";
import Layout from "../components/layout/Layout";
import {ContextProvider} from "../store/context";
import { useContext, useState } from "react";

function MyApp({ Component, pageProps }) {
    const [state, setState] = useState(true);
    return (
        <ContextProvider>
            <Layout>
                <Component
                    handleSuccess={() => setState(!state)}
                    {...pageProps}
                />
            </Layout>
        </ContextProvider>
    );
}

export default MyApp;
