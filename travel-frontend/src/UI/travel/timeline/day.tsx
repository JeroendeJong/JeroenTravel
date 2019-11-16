import React from 'react';
import styled from 'styled-components';
import { TripDetail } from '../trip-detail-page';
import TimelineBody from './body';
import { lighten, darken } from 'polished';

const TimeLineDayBanner = styled.div`
  height: 20px;
  position: absolute;
  padding: 10px;
  background-color: ${p => p.theme.color.primary};
  color: ${p => lighten(1, p.theme.color.text)};
  border-bottom-right-radius: 20px;
  border-top-right-radius: 20px;

  margin-left: -25px;
  width: 100px;
  text-align: center;
`;

const FlexContainer = styled.div`
  display: flex;
`;

const SegmentContainer = styled.div`
  width: calc(100% - 30px);
`

const SegmentTitle = styled.p`
  font-weight: bold;
  font-size: 18px;
`;

const TimeLineLeftTime = styled.div`
  width: 2px !important;
  background-color: ${p => p.theme.color.primary};
`;

const TimelineShortDescription = styled.p`
  font-size: 14px;
  color: ${p => lighten(0, p.theme.color.text)};

`;

interface Props {
  stories: TripDetail[]
  dateText: String
}

const TimelineDay = (props: Props) => {
  return (
    <FlexContainer>
       <TimeLineDayBanner>
        {props.dateText}
      </TimeLineDayBanner>
      <TimeLineLeftTime/>

      <SegmentContainer>
        {props.stories.map(segment => (
          <TimelineBody key={segment.id}>
            <SegmentTitle>{segment.name}</SegmentTitle>
            <TimelineShortDescription>{segment.short_description}</TimelineShortDescription>
          </TimelineBody>
        ))}
      </SegmentContainer>
    </FlexContainer>
  );
}

export default TimelineDay;