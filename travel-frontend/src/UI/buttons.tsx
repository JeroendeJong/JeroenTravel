import React from 'react';
import styled from 'styled-components';




const PrimaryButtonStyle = styled.button`
  background-color: #002A3F;
  border-radius: 20px;
  border: 0px;

  margin-left: 10px;
  margin-right: 10px;

  :focus {
    outline:0;
  }

  cursor: pointer;
`;

const PrimaryButtonText = styled.p`
  font-size: 16px;
  color: lightgray;

  margin: 0px;
  padding: 5px;
`;

export const PrimaryButton = (props: any) => {

  return (
    <PrimaryButtonStyle className={props.className} onClick={props.onClick}>
      <PrimaryButtonText>{props.text}</PrimaryButtonText>
    </PrimaryButtonStyle>
  );
}