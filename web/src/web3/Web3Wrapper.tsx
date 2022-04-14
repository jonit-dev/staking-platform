import { appEnv } from "@constants/appEnv";
import { showError } from "@libs/ToastHelpers";
import { contractHelper } from "@libs/web3/ContractHelper";
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
    (async () => {
      if (!metamask.isInstalled()) {
        showError("Error: you must have MetaMask installed to use this dApp.");
      } else {
        await web3Store.initializeMetamask();
      }

      const correctNetwork = await metamask.isCorrectNetwork();
      if (correctNetwork === false) {
        showError(
          `Please switch to the ${appEnv.web3.network.name} network to use this dApp.`
        );
        return;
      }

      const isConnected = await metamask.isConnected();

      if (isConnected) {
        web3Store.setStatus(Web3Status.Connected);
      } else {
        web3Store.setStatus(Web3Status.Disconnected);
      }

      setInterval(() => {
        // keep checking to see if user disconnected!
        (async () => {
          await metamask.updateConnectionStatus();
        })();
      }, 1000);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (
        metamask.isInstalled() &&
        currentAccount &&
        (await metamask.isConnected()) &&
        (await metamask.isCorrectNetwork())
      ) {
        await contractHelper.loadContractsData();
      }
    })();
  }, [currentAccount]);

  return <Container>{children}</Container>;
});

const Container = styled.div``;
