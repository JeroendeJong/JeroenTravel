import React from 'react';
import styled from 'styled-components';
import TimelineBody from './body';
import { lighten } from 'polished';
import moment from 'moment';
import { RedIcon } from '../misc/common';

import Icon from '../../common/evil-icon';
import { TripDetail } from '../types';

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
  width: calc(100% - 20px);
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

const SecondarySegmentContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: ${p => p.theme.color.text};
`;

const NewPostDurationContainer = styled.span`
  margin-right: -10px;
  display: flex;
  align-items: center;
`;

const AccomodationIcon = styled.svg`
  width: 20px;
  height: 20px;
  fill: ${p => p.theme.color.text};
  margin-right: 5px;
`;

const CenterAlignContainer = styled.span`
  display: flex;
  align-items: center;
`;  

const SecondarySegmentData = ({data}: {data: TripDetail}) => {
  const postedTime = moment(moment.now()).diff(data.posted_time);
  const durationSincePosted = Math.round(moment.duration(postedTime).asHours());
  return (
    <SecondarySegmentContainer>
      <CenterAlignContainer>
        {data.accomodation.name &&
          <CenterAlignContainer>
            <AccomodationIcon viewBox="0 0 251.479 251.479" >
              <path d="M209.355,135.551c-4.143,0-7.5,3.358-7.5,7.5v76.109H49.634v-76.109c0-4.142-3.357-7.5-7.5-7.5c-4.143,0-7.5,3.358-7.5,7.5
                v83.609c0,4.142,3.357,7.5,7.5,7.5h167.221c4.143,0,7.5-3.358,7.5-7.5v-83.609C216.855,138.909,213.497,135.551,209.355,135.551z"
                />
              <path d="M249.282,137.748L131.035,19.515c-2.928-2.929-7.677-2.928-10.606,0L2.197,137.748c-2.929,2.929-2.929,7.678,0,10.606
                c1.465,1.464,3.385,2.197,5.304,2.197c1.92,0,3.839-0.732,5.304-2.197l112.929-112.93l112.943,112.93
                c2.928,2.929,7.677,2.928,10.607-0.001C252.211,145.425,252.211,140.676,249.282,137.748z"/>
            </AccomodationIcon>
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
            <strong>Posted: {durationSincePosted} hour(s) ago</strong>
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