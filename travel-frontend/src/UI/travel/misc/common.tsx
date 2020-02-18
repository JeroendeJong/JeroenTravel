import styled from "styled-components";
import ScrollableView from '../../common/scroll-view';
import TravelImage from "./image-view";
import { lighten, readableColor, darken } from "polished";
import { StyledHover } from "../../styled-utils";
import withHeaderTitleScrollContext from "../title-header-scroll";
import Icon from "../../common/evil-icon";

export const TopLeftActionIconContainer = styled.div`
  position: absolute;
  margin-top: 5px;
  margin-left: 5px;

  mix-blend-mode: difference;

  svg {
    width: 30px;
    height: 30px;
  }
`;

export const ScrollableTripContent = withHeaderTitleScrollContext(
  styled(ScrollableView)`
    position: relative;
    z-index: -1;
  `
);

export const TripHeaderImage = styled(TravelImage)`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

export const ContextOptionButtons = styled.a`
  display: flex;
  align-items: center;
  border-radius: 5px;
  background-color: ${p => p.theme.color.primary};
  color: ${p => readableTravelColor(p.theme.color.primary)};
  font-size: 12px;
  float: right;

  margin-left: 2px;
  margin-right: 2px;

  p {
    margin: 0;
    padding-right: 5px;
  }

  ${StyledHover`
    cursor: pointer;
  `}
`;

export const RedIcon = styled(Icon)`
  color: red;
`;

export const readableTravelColor = (color: string) => {
  return readableColor(color, 
    lighten(0.1, 'black'),
    darken(0.05, 'white')
  );
}