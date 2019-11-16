import React from 'react';
import styled from 'styled-components';


const PrimaryButtonText = styled.p`
  font-size: 16px;
  color: ${p => p.theme.color.text};
  margin: 0px;
  padding: 5px;
`;


const PrimaryButtonStyle = styled.button`
  background-color: ${p => p.theme.color.primary};
  border-radius: 20px;
  border: 0px;

  margin-left: 10px;
  margin-right: 10px;

  cursor: pointer;

  :focus {
    outline:0;
  }

  :hover {
    background-color: ${p => p.theme.color.highlight}
  }
`;


export const PrimaryButton = (props: any) => {

  return (
    <PrimaryButtonStyle className={props.className} onClick={props.onClick}>
      <PrimaryButtonText>{props.text}</PrimaryButtonText>
    </PrimaryButtonStyle>
  );
}