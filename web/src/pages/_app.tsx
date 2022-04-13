import type { AppProps } from "next/app";
import web3 from "web3";
import Web3Provider from "web3-react";
import { ScriptLoader } from "../components/ScriptLoader";
import { Web3Wrapper } from "../components/Web3Wrapper";
import "../styles/index.css";
import { connectors } from "../web3/connectors";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Web3Provider
      connectors={connectors}
      libraryName={"web3.js"}
      web3Api={web3}
    >
      <Web3Wrapper>
        <ScriptLoader />

        <Component {...pageProps} />
      </Web3Wrapper>
    </Web3Provider>
  );
}

export default MyApp;
