import React, { useEffect } from "react";
import styled from "styled-components";
import { useWeb3Context } from "web3-react";
import { web3Store } from "../store/root.store";

interface IProps {
  children: React.ReactNode;
}

export const Web3Wrapper: React.FC<IProps> = ({ children }) => {
  const context = useWeb3Context();

  useEffect(() => {
    context.setFirstValidConnector(["MetaMask", "Infura"]);
  }, []);

  useEffect(() => {
    if (context) {
      console.log(context);

      if (context.account) {
        web3Store.setAccount(context.account);
      }
    }
  }, [context]);

  return <Container>{children}</Container>;
};

const Container = styled.div``;
