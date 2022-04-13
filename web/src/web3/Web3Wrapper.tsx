import { showError } from "@libs/ToastHelpers";
import { isMetamaskConnected, isMetamaskInstalled } from "@libs/Web3Helpers";
import { web3Store } from "@store/root.store";
import { Web3Status } from "@store/web3.store";
import React, { useEffect } from "react";
import styled from "styled-components";

interface IProps {
  children: React.ReactNode;
}

export const Web3Wrapper: React.FC<IProps> = ({ children }) => {
  useEffect(() => {
    if (!isMetamaskInstalled()) {
      showError("Error: you must have MetaMask installed to use this dApp.");
    }

    if (isMetamaskConnected()) {
      web3Store.setStatus(Web3Status.Connected);
    } else {
      web3Store.setStatus(Web3Status.Disconnected);
    }
  }, []);

  return <Container>{children}</Container>;
};

const Container = styled.div``;
