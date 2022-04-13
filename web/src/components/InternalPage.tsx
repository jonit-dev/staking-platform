import React from "react";
import styled from "styled-components";

interface IProps {
  children: React.ReactNode;
}

export const InternalPage: React.FC<IProps> = ({ children }) => {
  return <Container>{children}</Container>;
};

const Container = styled.div`
  max-width: 50%;
  margin: 0 auto;
`;
