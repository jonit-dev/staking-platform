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

export const Web3ConnectionMonitor: React.FC<IProps> = observer(
  ({ children }) => {
    useEffect(() => {
      (async () => {
        if (!metamask.isInstalled()) {
          showError(
            "Error: you must have MetaMask installed to use this dApp."
          );
        } else {
          await web3Store.initializeMetamask();
        }

        const isConnected = await metamask.isConnected();

        if (isConnected) {
          web3Store.setStatus(Web3Status.Connected);
        } else {
          web3Store.setStatus(Web3Status.Disconnected);
        }
      })();
    }, []);

    setInterval(() => {
      // keep checking to see if user disconnected!
      (async () => {
        await metamask.updateConnectionStatus();
      })();
    }, 1000);

    return <Container>{children}</Container>;
  }
);

const Container = styled.div`
  height: 100%;
`;
