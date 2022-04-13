import React from "react";
import { IconType } from "react-icons";
import styled from "styled-components";

interface IProps {
  text: string;
  Icon: IconType;
}

export const TextIcon: React.FC<IProps> = ({ Icon, text }) => {
  return (
    <Container>
      <Icon />
      <span>{text}</span>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;

  span {
    font-size: 0.8rem;
    margin-left: 0.5rem;
    font-weight: bold;
  }
`;
