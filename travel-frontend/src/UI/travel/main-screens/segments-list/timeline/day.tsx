import React from 'react';
import styled from 'styled-components';
import TimelineBody from './body';
import moment from 'moment';
import { RedIcon, readableTravelColor } from '../../../misc/common';

import Icon from '../../../../common/evil-icon';
import { TripDetail } from '../../../types';

const TimeLineDayBanner = styled.div`
  height: 20px;
  position: absolute;
  padding: 10px;
  background-color: ${p => p.theme.color.primary};
  color: ${p => readableTravelColor(p.theme.color.primary)};
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
  width: calc(100% - 20px);
`;

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
  color: ${p => readableTravelColor(p.theme.color.secondary)};
`;

const SecondarySegmentContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: ${p => readableTravelColor(p.theme.color.secondary)};
`;

const NewPostDurationContainer = styled.span`
  margin-right: -10px;
  display: flex;
  align-items: center;
`;

const CenterAlignContainer = styled.span`
  display: flex;
  align-items: center;
`;  

const getDurationSincePostedText = (duration: number): string => {
  if (duration === 0) return 'Posted: less than an hour ago';
  else return `Posted: ${duration} hour(s) ago`;
}

const SecondarySegmentData = ({data}: {data: TripDetail}) => {
  const postedTime = moment(moment.now()).diff(data.posted_time);
  const durationSincePosted = Math.round(moment.duration(postedTime).asHours());
  return (
    <SecondarySegmentContainer>
      <CenterAlignContainer>
        {data.accomodation.name &&
          <CenterAlignContainer>
            
            <strong>{data.accomodation.name.replace(/\u00a0/g, " ")}</strong>
          </CenterAlignContainer>
        }

        {data.location_type && data.location_text &&
          <CenterAlignContainer>
            {data.location_type &&
              <Icon id={'ei-location-icon'}/>
            }
          
            <p>{data.location_text}</p>
          </CenterAlignContainer>
        }
      </CenterAlignContainer>

      <div>
        {durationSincePosted < 24 &&
          <NewPostDurationContainer>
            <RedIcon id={'ei-exclamation-icon'}/>
            <strong>{getDurationSincePostedText(durationSincePosted)}</strong>
          </NewPostDurationContainer>
        }
      </div>
      
    </SecondarySegmentContainer>
  );
}

interface Props {
  stories: TripDetail[];
  dateText: String;
  onClick: (e: React.MouseEvent<HTMLDivElement>) => void;
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
          <TimelineBody key={segment.id} id={segment.id} onClick={props.onClick}>
            <SecondarySegmentData data={segment}/>
            <SegmentTitle>{segment.name}</SegmentTitle>
            <TimelineShortDescription>{segment.short_description}</TimelineShortDescription>
          </TimelineBody>
        ))}
      </SegmentContainer>
    </FlexContainer>
  );
}

export default TimelineDay;