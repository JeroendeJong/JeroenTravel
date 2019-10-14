import styled from "styled-components";
import ScrollableView from '../common/scroll-view';
import TravelImage from "./image-view";

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

export const ScrollableTripContent = styled(ScrollableView)`
  position: relative;
  margin-top: -8px;
  z-index: -1;
`;

export const TripHeaderImage = styled(TravelImage)`
  width: 100%;
  border-radius: 6px;
  height: 200px;
  object-fit: cover;
`;