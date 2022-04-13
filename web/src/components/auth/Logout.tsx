import React from "react";
import styled from "styled-components";
import { BaseButton } from "../BaseButton";

interface IProps {
  onClick: () => void;
}

export const Logout: React.FC<IProps> = ({ onClick }) => {
  return (
    <Container onClick={onClick}>
      <BaseButton>
        <p>Disconnect</p>
      </BaseButton>
    </Container>
  );
};

const Container = styled.div`
  max-width: 135px;
`;
