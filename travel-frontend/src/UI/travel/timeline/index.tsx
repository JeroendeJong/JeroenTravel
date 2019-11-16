import React from 'react';
import styled from 'styled-components';
import { TripDetail } from '../trip-detail-page';
import moment from 'moment';
import TimelineDay from './day';

const TimelineContainer = styled.div`
  margin-left: 10px;
`;

interface ComponentProps {
  onClick: (e: React.MouseEvent<HTMLDivElement>) => void;
  tripItems: TripDetail[];
}

const VerticalTripTimelineContainer = (props: ComponentProps) => {
  const dateStringToContentMap = props.tripItems.reduce((agg: any, val: TripDetail) => {
    const date = moment(val.arrival_time).format('YYYY/MM/DD');
    if (!agg[date]) agg[date] = []
    agg[date].push(val);
    return agg;
  }, []);

  const dateArray = Object.keys(dateStringToContentMap).map(dateString => {
    return {date: moment(dateString), segments: dateStringToContentMap[dateString]};
  })

  return (
    <TimelineContainer>
      {dateArray.map((item: any) => (
        <TimelineDay
          key={item.date}
          dateText={moment(item.date).format('DD/MM/YYYY')} 
          stories={item.segments}
        /> 
      ))}
    </TimelineContainer>
  )
}

export default VerticalTripTimelineContainer;