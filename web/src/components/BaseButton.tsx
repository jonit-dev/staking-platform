import React from "react";
import styled from "styled-components";
import { uiColors } from "../constants/colors";

interface IProps {
  children: React.ReactNode;
}

export const BaseButton: React.FC<IProps> = ({ children }) => {
  return <Container>{children}</Container>;
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #eaeaea;
  border-radius: 5px;
  background-color: white;

  padding: 0.3rem;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  -webkit-box-shadow: 6px 4px 13px -8px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 6px 4px 13px -8px rgba(0, 0, 0, 0.75);
  box-shadow: 6px 4px 13px -8px rgba(0, 0, 0, 0.75);

  cursor: pointer;

  p {
    color: ${uiColors.dark};
    font-weight: bold;
    font-size: 0.9rem;
  }
`;
