import { appEnv } from "@constants/appEnv";
import { showError, showMessage } from "@libs/ToastHelpers";
import { networkHelper } from "@libs/web3/NetworkHelper";
import { web3Store } from "@store/root.store";
import { NetworkConnectionStatus } from "@store/web3.store";
import { observer } from "mobx-react";
import React, { useEffect } from "react";
import styled from "styled-components";

interface IProps {
  children: React.ReactNode;
  onNetworkChangeSuccess?: () => void;
  onNetworkChangeError?: () => void;
}

export const Web3NetworkMonitor: React.FC<IProps> = observer(
  ({ children, onNetworkChangeSuccess, onNetworkChangeError }) => {
    const { network } = web3Store;

    useEffect(() => {
      (async () => {
        if (network) {
          const isCorrectNetwork = await networkHelper.isCorrectNetwork();
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
              if (onNetworkChangeError) {
                onNetworkChangeError();
              }
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
            if (onNetworkChangeSuccess) {
              onNetworkChangeSuccess();
            }
            web3Store.setNetworkConnectionStatus(
              NetworkConnectionStatus.CorrectNetwork
            );
          }
        }
      })();
    }, [network]);

    return <Container>{children}</Container>;
  }
);

const Container = styled.div``;
