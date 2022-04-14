import { appEnv } from "@constants/appEnv";
import { showError, showMessage } from "@libs/ToastHelpers";
import { metamask } from "@libs/web3/wallets/MetamaskProvider";
import { web3Store } from "@store/root.store";
import { NetworkConnectionStatus } from "@store/web3.store";
import { observer } from "mobx-react";
import React, { useEffect } from "react";
import styled from "styled-components";

interface IProps {
  children: React.ReactNode;
}

export const Web3NetworkMonitor: React.FC<IProps> = observer(({ children }) => {
  const { network } = web3Store;

  useEffect(() => {
    (async () => {
      if (network) {
        const isCorrectNetwork = await metamask.isCorrectNetwork();
        if (!isCorrectNetwork) {
          if (
            !web3Store.networkConnectionStatus ||
            NetworkConnectionStatus.CorrectNetwork
          ) {
            showError(
              `Please switch to the ${appEnv.web3.network.name} network to use this dApp.`
            );
            web3Store.setNetworkConnectionStatus(
              NetworkConnectionStatus.WrongNetwork
            );
          }
        }
        if (
          web3Store.networkConnectionStatus ===
            NetworkConnectionStatus.WrongNetwork &&
          isCorrectNetwork
        ) {
          showMessage(
            `Successfully switched to ${appEnv.web3.network.name} network.`,
            "success"
          );
          web3Store.setNetworkConnectionStatus(
            NetworkConnectionStatus.CorrectNetwork
          );
        }
      }
    })();
  }, [network]);

  return <Container>{children}</Container>;
});

const Container = styled.div``;
