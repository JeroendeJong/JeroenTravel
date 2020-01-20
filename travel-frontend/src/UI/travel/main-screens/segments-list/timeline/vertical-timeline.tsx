import React from 'react';
import styled from 'styled-components';
import moment from 'moment';
import TimelineDay from './day';
import ActiveTripPromotion from '../active-trip-promotion';
import { TripDetail } from '../../../types';

import TimelineEndInActiveTrip from './the-end-inactive';
import TimelineEndActiveTrip from './the-end-active';

const TimelineContainer = styled.div``;


interface ComponentProps {
  onClick: (e: React.MouseEvent<HTMLDivElement>) => void;
  tripItems: TripDetail[];
  active: boolean;
}

const VerticalTimeline = (props: ComponentProps) => {
  const dateStringToContentMap = props.tripItems.reduce((agg: any, val: TripDetail) => {
    const noTimeDate = moment(val.arrival_time).format('YYYY/MM/DD');
    const noTimeISOTime = moment(noTimeDate).toISOString();

    if (!agg[noTimeISOTime]) agg[noTimeISOTime] = []
    agg[noTimeISOTime].push(val);
    return agg;
  }, []);

  const dateArray = Object.keys(dateStringToContentMap).map(dateString => {
    return {date: moment(dateString), segments: dateStringToContentMap[dateString]};
  })

  return (
    <TimelineContainer>
      {props.active &&
        <ActiveTripPromotion/>
      }
      {dateArray.map((item: any) => (
        <TimelineDay
          onClick={props.onClick}
          key={item.date}
          dateText={moment(item.date).format('DD/MM/YYYY')} 
          stories={item.segments}
        /> 
      ))}

      {props.active &&
        <TimelineEndActiveTrip/>
      }

      {!props.active &&
        <TimelineEndInActiveTrip/>
      }


    </TimelineContainer>
  )
}

export default VerticalTimeline;