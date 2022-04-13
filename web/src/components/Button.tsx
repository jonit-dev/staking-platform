import React from "react";
import styled from "styled-components";
import { uiColors } from "../constants/colors";

interface IProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  label: string;
  className: string;
}

export const Button: React.FC<IProps> = ({ label, className, ...props }) => {
  return (
    <Container>
      <div className="control">
        <button className={`button ${className}`} {...props}>
          {label}
        </button>
      </div>
    </Container>
  );
};

const Container = styled.div`
  button {
    background-color: ${uiColors.primary};
    color: white;

    &:hover {
      color: white;
    }
  }
`;
