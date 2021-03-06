import { ImageButton } from "@components/ImageButton";
import React from "react";
import styled from "styled-components";

interface IProps {
  onClick: () => void;
}

export const Login: React.FC<IProps> = ({ onClick }) => {
  return (
    <Container onClick={onClick}>
      <ImageButton imagePath="images/metamask.png" text="Connect" />
    </Container>
  );
};

const Container = styled.div``;
