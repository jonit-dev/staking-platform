import type { AppProps } from "next/app";
import web3 from "web3";
import Web3Provider from "web3-react";
import "../styles/index.css";
import { connectors } from "../web3/connectors";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Web3Provider
      connectors={connectors}
      libraryName={"web3.js"}
      web3Api={web3}
    >
      <Component {...pageProps} />
    </Web3Provider>
  );
}

export default MyApp;
