import { showError } from "@libs/ToastHelpers";
import { isMetamaskInstalled } from "@libs/web3/walletHelpers";
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
  }, []);

  return <Container>{children}</Container>;
};

const Container = styled.div``;
