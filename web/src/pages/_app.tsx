import type { AppProps } from "next/app";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import web3 from "web3";
import Web3Provider from "web3-react";
import { ScriptLoader } from "../components/ScriptLoader";
import "../styles/index.css";
import { connectors } from "../web3/connectors";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Web3Provider
      connectors={connectors}
      libraryName={"web3.js"}
      web3Api={web3}
    >
      <ScriptLoader />

      <Component {...pageProps} />
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        closeOnClick={true}
        pauseOnHover={true}
        draggable={true}
        theme="dark"
      />
    </Web3Provider>
  );
}

export default MyApp;
