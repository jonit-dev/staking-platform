import type { AppProps } from "next/app";
import web3 from "web3";
import Web3Provider from "web3-react";
import { web3Connectors } from "../web3/web3";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Web3Provider
      connectors={web3Connectors}
      libraryName={"web3.js"}
      web3Api={web3}
    >
      <Component {...pageProps} />
    </Web3Provider>
  );
}

export default MyApp;
