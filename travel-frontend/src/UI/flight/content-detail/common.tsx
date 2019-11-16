import styled from 'styled-components';

export const OtherDetails = styled.div`
  display: flex;
  justify-content: space-between;

  margin-left: 10px;
  margin-right: 10px;
`;

export const BottomAnchor = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  margin-bottom: 10px;
`;

export const OtherDetailItem = styled.span`
  color: ${p => p.theme.color.text};
`;

export const HorizontalSeperationLine = styled.p`
  width: 100%;
  height: 1px;
  background-color: gray;
`;