import React from 'react';
import styled from 'styled-components';
import { TripDetail } from '../trip-detail-page';
import TimelineHeader from './header';
import TimelineBody from './body';
import TripSegmentImagePreviews from '../trip-segment-image-previews';
import { lighten } from 'polished';
import moment from 'moment';

const TimelineShortDescription = styled.p`
  font-size: 14px;
  color: ${p => lighten(0.2, p.theme.color.primary)}
`;

const TimelineContainer = styled.div`
  margin-left: 10px;
`;

interface ComponentProps {
  onClick: (e: React.MouseEvent<HTMLDivElement>) => void;
  tripItems: TripDetail[];
}

const TripTitle = styled.p`
  font-weight: bold;
  font-size: 18px;

`;

const Line = styled.div`
  width: 2px !important;
  background-color: darkgreen;
`;

const FlexContainer = styled.div`
  display: flex;

`;

const NewDayBanner = styled.div`
  height: 20px;
  position: absolute;
  padding: 10px;
  background-color: green;
  border-bottom-right-radius: 20px;
  border-top-right-radius: 20px;


  // maybe css :X;
  margin-left: -25px;
  width: 100px;
  text-align: center;
`;

const SecondaryTripInformation = () => {
  return (
    <div>
      
    </div>
  )
}

const VerticalTripTimelineContainer = (props: ComponentProps) => {

  // essentially this bit should re-formatt the date to be like:
  // ordered by: time
  // grouped by: day 

  const items = props.tripItems.reduce((agg: any, val: TripDetail) => {
    const date = moment(val.arrival_time).format('DD/MM/YY');
    if (!agg[date]) agg[date] = []
    agg[date].push(val);
    return agg;
  }, []);

  console.log(items);


  return (
    <TimelineContainer>
      {props.tripItems.map((item: TripDetail, i: number) => (
        <FlexContainer>
          {i % 3 === 0 && 
            <NewDayBanner>
              {moment(item.arrival_time).format('DD/MM/YY')}
            </NewDayBanner>
          }

          <Line/>

          <TimelineBody>
            <TripTitle>{item.name}</TripTitle>
            <TimelineShortDescription>{item.short_description}</TimelineShortDescription>
          </TimelineBody>
        </FlexContainer>
      ))}
    </TimelineContainer>
  )
}

export default VerticalTripTimelineContainer;