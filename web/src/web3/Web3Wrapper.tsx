import { appEnv } from "@constants/appEnv";
import { showError } from "@libs/ToastHelpers";
import { metamask } from "@libs/web3/wallets/MetamaskProvider";
import { web3Store } from "@store/root.store";
import { Web3Status } from "@store/web3.store";
import { observer } from "mobx-react";
import React, { useEffect } from "react";
import styled from "styled-components";

interface IProps {
  children: React.ReactNode;
}

export const Web3Wrapper: React.FC<IProps> = observer(({ children }) => {
  const { currentAccount, web3 } = web3Store;

  useEffect(() => {
    if (!metamask.isInstalled()) {
      showError("Error: you must have MetaMask installed to use this dApp.");
    }

    (async () => {
      const correctNetwork = await metamask.isCorrectNetwork();
      if (correctNetwork === false) {
        showError(
          `Please switch to the ${appEnv.web3.network.name} network to use this dApp.`
        );
      }

      const isConnected = await metamask.isConnected(false);

      if (!isConnected) {
        web3Store.setStatus(Web3Status.Disconnected);
      }
    })();
  }, []);

  // useEffect(() => {
  //   (async () => {
  //     if (currentAccount && (await metamask.isConnected())) {
  //       await contractHelper.refreshInformation();
  //     }
  //   })();
  // }, [currentAccount]);

  return <Container>{children}</Container>;
});

const Container = styled.div``;
