import styled, {css} from "styled-components";

export const HorizontalSeperationLine = styled.p<{styleType?: 'Faint'}>`
  width: 85%;
  height: 1px;
  margin: auto;

  background-color: gray;

  ${p => p.styleType === 'Faint' && css`
    background-color: lightgray;
    opacity: 0.5;
  `}
`;