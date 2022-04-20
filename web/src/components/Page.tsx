import { uiStore } from "@store/root.store";
import { observer } from "mobx-react";
import React from "react";
import styled from "styled-components";
import { Loading } from "./Loading";
import { Navbar } from "./Navbar";

interface IProps {
  children: React.ReactNode;
}

export const Page: React.FC<IProps> = observer(({ children }) => {
  return (
    <>
      <Navbar />
      <PageContainer>
        <PageBody className="container">
          {uiStore.isLoading ? <Loading /> : children}
        </PageBody>
      </PageContainer>
    </>
  );
});

const PageContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const PageBody = styled.div`
  padding: 2rem;
  height: 100%;
`;
