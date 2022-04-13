import React from "react";
import styled from "styled-components";
import { BaseButton } from "./BaseButton";

interface IProps {
  imagePath?: string;
  text: string;
}

export const ImageButton: React.FC<IProps> = ({ imagePath, text }) => {
  return (
    <BaseButton>
      {imagePath && <Img src={imagePath} alt={text} />}
      <ButtonText>{text}</ButtonText>
    </BaseButton>
  );
};

const Img = styled.img`
  flex: 25%;
  height: 30px;
  object-fit: scale-down;
`;
const ButtonText = styled.span`
  flex: auto;
  font-weight: bold;
  font-size: 0.8rem;
  text-align: center;
  color: #222a68;

  margin-left: 0.5rem;
`;
