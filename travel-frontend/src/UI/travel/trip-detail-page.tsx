import React from 'react';
import { TripOverview } from './trip-overview-item';
import { getTravelTrip, getImageUrL } from '../../constants';
import map from '../../map';
import {coordinatesToBounds, centreOnBounds} from '../../map/utils';
import styled from 'styled-components';
import TravelImage from './image-view';
import TimelineHeader from './timeline/header';
import TimelineBody from './timeline/body';
import Icon from '../../evil-icon';
import { TopLeftActionIconContainer, ScrollableTripContent, TripHeaderImage } from './common';

export interface TripDetail {
  id: string;
  type: string;
  name: string;
  short_description: string;
  long_description: string;
  arrival_time: any;
  deparutre_time: any;
  header_image_url: any;
}

const MaincontentContainer = styled.div`
  padding: 15px;
`;

const TripName = styled.div`
  text-align: center;
  font-size: 40px;
  width: 100%;
`;

const TripBody = styled.div`
  font-size: 14px;
`;

const TripTimelineHeaderText = styled.div`
  font-size: 18px;
  font-weight: bold;

  margin-top: 20px;
`;

const TimelineContainer = styled.div`
  margin-left: 10px;
`;



interface ComponentProps {
  trip: TripOverview;
  onClose: () => void;
  onClick: (segmentId: number) => void;
}

interface ComponentState {
  details: any;
}

class TripDetailPage extends React.Component<ComponentProps, ComponentState> {

  public state = {
    details: {}
  }

  public componentDidMount(): void {
    const {trip} = this.props;
    fetch(getTravelTrip(parseInt(trip.id)))
      .then(resp => resp.json())
      .then(json => {
        map.setTravelLayer(json);
        this.setState({details: json})

        if (!trip.extent) return;
        const coords: any = trip.extent.coordinates[0];
        const bounds = coordinatesToBounds(coords);
        centreOnBounds(bounds);
      });
  }

  public componentWillUnmount(): void {
    map.clearTravelLayer();
  }

  private handleSegmentDetailClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const numb = el.getAttribute('data-id');
    if (numb && numb.length > 0) this.props.onClick(parseInt(numb, 10));
  }

  public render(): JSX.Element {
    const details: any = this.state.details;
    const {trip} = this.props;
    return (
      <>
        <TopLeftActionIconContainer onClick={this.props.onClose}>
          <Icon id="ei-close-o-icon"/>
        </TopLeftActionIconContainer>
        <ScrollableTripContent>
          <TripHeaderImage src={getImageUrL(trip.header_image_url)} alt="Travel Trip Header image"/>
          <MaincontentContainer>
            <TripName>{trip.name}</TripName>
            <TripBody>
              {trip.description}
            </TripBody>
            {details.features && details.features.length > 0 && 
              <>
                <TripTimelineHeaderText>Travel diary</TripTimelineHeaderText>
                <TimelineContainer>
                  {details!.features.map(
                    (segment: any) => {
                      const item = segment.properties as TripDetail;
                      return (
                        <React.Fragment key={item.id}>
                          <TimelineHeader id={item.id} title={item.name} onClick={this.handleSegmentDetailClick}/>
                          <TimelineBody body={item.short_description}/>
                        </React.Fragment>
                      )
                    })
                  }
                </TimelineContainer>
              </>
            }
          </MaincontentContainer>
        </ScrollableTripContent>
      </>
    )

  }
}

export default TripDetailPage;