import { Web3Wrapper } from "@components/web3/Web3Wrapper";
import type { AppProps } from "next/app";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { ScriptLoader } from "../components/ScriptLoader";
import "../styles/index.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <ScriptLoader />
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        closeOnClick={true}
        pauseOnHover={true}
        draggable={true}
        style={{
          width: "auto",
        }}
        theme="dark"
      />

      <Web3Wrapper>
        <Component {...pageProps} />
      </Web3Wrapper>
    </>
  );
}

export default MyApp;
