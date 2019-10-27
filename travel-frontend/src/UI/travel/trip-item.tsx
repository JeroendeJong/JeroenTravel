import React from 'react';
import CountryFlags from 'emoji-flags';
import styled, { keyframes } from 'styled-components';
import Icon from '../../evil-icon';
import moment from 'moment';

export interface TripOverview {
  id: string;
  name: string;
  description: string;
  country_codes: string;
  header_image_url: string;
  active: boolean;
  extent: {coordinates: number[]};
  start_date: string;
  end_date: string;
}

interface ComponentProps {
  tripOverview: TripOverview;
  onClick?: (trip: TripOverview) => void;
  active: boolean;
}

const CountryCodesToEmoji = (codes: string): string => {
  return codes.split(',').map(code => {
    const cleanCode = code.trim();
    return CountryFlags.countryCode(cleanCode).emoji;
  }).join('')
}

const TripContainer = styled.div`
  margin: 15px;
  margin-bottom: 15px;
  cursor: pointer;
  padding: 5px;
  border-radius: 2px;

  :hover {
    background-color: ${p => p.theme.color.highlight};
  }
`

const TripName = styled.div`
  color: ${p => p.theme.color.primary};
  font-size: 20px;
`;

const TripDescription = styled.div`
  color: ${p => p.theme.color.white};
  font-size: 12px;

  margin-left: 2px;

  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  line-height: 14px;
  max-height: 28px;   // <--- line-height * 2
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;

`;

const BottomLine = styled.div`
  display: flex;
  justify-content: space-between;

  margin-top: 8px;
  margin-left: 2px;
`;

const BlinkAnim = keyframes`
  from { opacity: 1.0; }
  to { opacity: 0.4; }
`
const RedIcon = styled(Icon)`
  color: red;
`;

const BlinkActiveTrip = styled.span`
  color: red;
  animation: ${BlinkAnim} 2s linear infinite alternate;
  font-size: 12px;

  display: flex;
  align-items: center;
`;

const TripOverviewItem = (props: ComponentProps) => {
  const trip = props.tripOverview;

  const onTripClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (props.onClick) props.onClick(trip);
  }

  const start = moment(trip.start_date);
  const end = moment(trip.end_date);
  const diff = end.diff(start);
  const momentDuration = moment.duration(diff);
  const prettyDuration = Math.ceil(momentDuration.asDays());

  // is trip in DB but has no content?
  if (isNaN(prettyDuration)) return null;

  return (
    <TripContainer onClick={onTripClick} data-id={trip.id}>
      <TripName>{trip.name}</TripName>
      <TripDescription>{trip.description}</TripDescription>
      <BottomLine>
        {props.active &&
          <BlinkActiveTrip>
            <RedIcon id={'ei-exclamation-icon'}/>
            <span>Trip Currently in progress, follow me!</span>
          </BlinkActiveTrip>
        }
        {!props.active &&
          <div>{prettyDuration} day trip</div>
        }

        <span>{CountryCodesToEmoji(trip.country_codes)}</span>
      </BottomLine>
    </TripContainer>
  );
}

TripOverviewItem.defaultProps = {
  active: false
}

export default TripOverviewItem;