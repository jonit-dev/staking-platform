import React from "react";
import styled from "styled-components";

interface IProps {
  onClick: () => void;
}

export const Logout: React.FC<IProps> = ({ onClick }) => {
  return (
    <Container onClick={onClick}>
      <p>Disconnect</p>
    </Container>
  );
};

const Container = styled.div`
  max-width: 135px;

  p {
    font-weight: bold;
    cursor: pointer;
  }
`;
