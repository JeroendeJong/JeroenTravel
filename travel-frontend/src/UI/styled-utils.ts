import { css } from "styled-components";


export const StyledHover = (...input: any) => {
  return css`
    @media (hover: hover) {
      :hover {
        ${(css as any)(...input)}
      }
    }
  `;
}