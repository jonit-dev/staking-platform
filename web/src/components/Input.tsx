import React from "react";
import styled from "styled-components";

interface IProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  label: string;
}

export const Input: React.FC<IProps> = ({ label, ...props }) => {
  return (
    <Container>
      <div className="field">
        <label className="label">{label}</label>
        <div className="control">
          <input className="input" {...props} />
        </div>
      </div>
    </Container>
  );
};

const Container = styled.div`
  margin-bottom: 1rem;
`;
