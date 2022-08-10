import "../styles/container.css";
import "antd/dist/antd.css";
import { PlayerContextProvider } from "../hooks/PlayerAuth";

export default function MyApp({ Component, pageProps }) {
    return(<PlayerContextProvider>
        <Component {...pageProps} />
    </PlayerContextProvider>);
}