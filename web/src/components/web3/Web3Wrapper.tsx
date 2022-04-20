import { contractHelper } from "@libs/web3/ContractHelper";
import { networkHelper } from "@libs/web3/NetworkHelper";
import { metamask } from "@libs/web3/wallets/MetamaskProvider";
import { web3Store } from "@store/root.store";
import { observer } from "mobx-react";
import React, { useEffect } from "react";
import styled from "styled-components";
import { Web3ConnectionMonitor } from "./Web3ConnectionMonitor";
import { Web3NetworkMonitor } from "./Web3NetworkMonitor";

interface IProps {
  children: React.ReactNode;
}

export const Web3Wrapper: React.FC<IProps> = observer(({ children }) => {
  const { currentAccount } = web3Store;

  useEffect(() => {
    (async () => {
      if (
        metamask.isInstalled() &&
        currentAccount &&
        (await metamask.isConnected()) &&
        (await networkHelper.isCorrectNetwork())
      ) {
        await contractHelper.loadContractsData();
      }
    })();
  }, [currentAccount]);

  return (
    <Container>
      <Web3NetworkMonitor
        onNetworkChangeSuccess={async () => {
          await contractHelper.loadContractsData();
        }}
      >
        <Web3ConnectionMonitor>{children}</Web3ConnectionMonitor>
      </Web3NetworkMonitor>
    </Container>
  );
});

const Container = styled.div``;
