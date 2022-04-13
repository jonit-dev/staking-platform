import React from "react";
import styled from "styled-components";
import { Navbar } from "./Navbar";

interface IProps {
  children: React.ReactNode;
}

export const Page: React.FC<IProps> = ({ children }) => {
  return (
    <>
      <Navbar />
      <Container className="container">{children}</Container>
    </>
  );
};

const Container = styled.div`
  padding: 2rem;
  height: 100%;
`;
