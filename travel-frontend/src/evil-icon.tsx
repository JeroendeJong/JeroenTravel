import React from 'react';
import styled from 'styled-components';



const ClickableSVG = styled.svg`
  flex: none;

  :hover {
    cursor: pointer
  }
`;


const Icon = (props: any) => {
  return (
    <ClickableSVG 
      onClick={props.onClick} 
      className={`${props.className} icon`} 
      width="0" 
      height="0"
    >
      <use xlinkHref={`#${props.id}`}/>
    </ClickableSVG>
  );
}

Icon.defaultProps = {
  className: '',
  id: ''
}

export default Icon;

