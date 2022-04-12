import React from "react";
import styled from "styled-components";
import { Navbar } from "./Navbar";

interface IProps {
  children: React.ReactNode;
}

export const Page: React.FC<IProps> = ({ children }) => {
  return (
    <Container>
      <Navbar />
      {children}
    </Container>
  );
};

const Container = styled.div`
  height: 100%;
`;
