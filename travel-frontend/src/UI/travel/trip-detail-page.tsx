import React from 'react';
import { TripOverview } from './trip-item';
import { getTravelTrip, getImageUrl, getTravelTripGeometry } from '../../constants';
import map from '../../map';
import {coordinatesToBounds, centreOnBounds} from '../../map/utils';
import styled from 'styled-components';
import { ScrollableTripContent, TripHeaderImage } from './misc/common';
import drawerStore from '../common/drawer-store';
import VerticalTripTimeline from './timeline';
import { darken, lighten } from 'polished';
import Icon from '../common/evil-icon';
import {ContextOptionButtons} from './misc/common'
import ShareComponent from './misc/share-options';

export interface TripDetail {
  id: string;
  type: string;
  name: string;
  short_description: string;
  long_description: string;
  arrival_time: any;
  departure_time: any;
  header_image_url: any;
}

const MaincontentContainer = styled.div`
  height: 100%;
  padding: 15px;
`;

const TripTitle = styled.div`
  text-align: center;
  font-size: 40px;
  width: 100%;

  color: ${(p: any) => darken(0.5, p.theme.color.text)};
`;

const SmallTripName = styled(TripTitle)` font-size: 20px; `

const TripBody = styled.div`
  font-size: 14px;
  text-align: center;
`;

interface ComponentProps {
  trip: TripOverview;
  onClick: (segmentId: number) => void;
}

interface ComponentState {
  details: TripDetail[];
}

class TripDetailPage extends React.Component<ComponentProps, ComponentState> {

  public state = {
    details: []
  }

  public componentDidMount(): void {
    const {trip} = this.props;
    drawerStore.emit('CONTENT_CLOSEABLE', 'TripDetailPage');

    const tripId = parseInt(trip.id, 10);
    fetch(getTravelTrip(tripId))
      .then(resp => resp.json())
      .then(json => {
        this.setState({details: json})

        if (!trip.extent) return;
        const coords: any = trip.extent.coordinates[0];
        const bounds = coordinatesToBounds(coords);
        centreOnBounds(bounds);
      });

    map.setTravelLayer(getTravelTripGeometry(tripId));
  }

  public componentWillUnmount(): void {
    map.clearTravelLayer();
    drawerStore.setTopContent(null);
  }

  private handleSegmentDetailClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const numb = el.getAttribute('data-id');
    if (numb && numb.length > 0) this.props.onClick(parseInt(numb, 10));
  }

  private handleTitleOutOfViewScroll = (e: React.MouseEvent<any>) => {
    const scrolllContainerValue = e.currentTarget.scrollTop;
    if (scrolllContainerValue > 300) {
      const {trip} = this.props;
      drawerStore.setTopContent(
        <SmallTripName>{trip.name}</SmallTripName>
      );
    } else {
      drawerStore.setTopContent(null);
    }
  }

  public render(): JSX.Element {
    const details: any = this.state.details;
    const {trip} = this.props;
    return (
      <>
        <ScrollableTripContent onScroll={this.handleTitleOutOfViewScroll}>
          <TripHeaderImage src={getImageUrl(trip.header_image_url)} alt="Travel Trip Header image"/>
          <MaincontentContainer>
            <TripTitle>{trip.name}</TripTitle>
            <TripBody>
              {trip.description}
            </TripBody>

            <div>
              <ContextOptionButtons>
                <Icon id="ei-camera-icon"/>
                <p>TLDR mode</p>
              </ContextOptionButtons>

              <ShareComponent title={trip.name} url={'www.jeroentravel.com'}/>
            </div>

            <div>
              <Icon id="ei-camera-icon"/>
            </div>

            {details && details.length > 0 && 
              <VerticalTripTimeline tripItems={details} onClick={this.handleSegmentDetailClick}/>
            }
            
          </MaincontentContainer>
        </ScrollableTripContent>
      </>
    );
  }
}

export default TripDetailPage;