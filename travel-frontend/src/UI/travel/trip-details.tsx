import React from 'react';
import { TripOverview } from './trips-item';
import { getTravelTrip, getImageUrl, getTravelTripGeometry } from '../../constants';
import map from '../../map';
import {coordinatesToBounds, centreOnBounds} from '../../map/utils';
import styled from 'styled-components';
import { ScrollableTripContent, TripHeaderImage } from './misc/common';
import drawerStore from '../common/drawer-store';
import VerticalTimeline from './timeline/vertical-timeline';
import { darken } from 'polished';
import Icon from '../common/evil-icon';
import {ContextOptionButtons} from './misc/common'
import ShareOptionsComponent from './misc/share-options';
import VerticalTLDRTimeline from './timeline/vertical-tldr-timeline';

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

const TripHeader = styled.div`
  text-align: center;
  font-size: 40px;
  width: 100%;

  color: ${(p: any) => darken(0.5, p.theme.color.text)};
`;


const TripBody = styled.div`
  font-size: 14px;
  text-align: center;
`;

const ContextButtons = styled.div`
  display: flex;
  justify-content: flex-end;
`;

interface ComponentProps {
  trip: TripOverview;
  onClick: (segmentId: number) => void;
}

interface ComponentState {
  details: TripDetail[];
  tldrMode: boolean;
}

class TripDetailPage extends React.Component<ComponentProps, ComponentState> {

  public state = {
    details: [],
    tldrMode: false
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
  }

  private handleSegmentDetailClick = (e: React.MouseEvent<HTMLDivElement>) => {
    console.log(e);
    const el = e.currentTarget;
    const idString = el.getAttribute('data-id');
    console.log(idString);
    if (idString && idString.length > 0) this.props.onClick(parseInt(idString, 10));
  }

  private handleTLDRMode = () =>{
    this.setState(oldState => ({tldrMode: !oldState.tldrMode}));
  }

  public render(): JSX.Element {
    const details: any = this.state.details;
    const {trip} = this.props;
    const {tldrMode} = this.state
    return (
      <>
        <ScrollableTripContent title={trip.name} pixelOffset={300}>
          <TripHeaderImage src={getImageUrl(trip.header_image_url)} alt="Travel Trip Header image"/>
          <MaincontentContainer>
            <TripHeader>{trip.name}</TripHeader>
            <TripBody>
              {trip.description}
            </TripBody>

            <ContextButtons>
              <ShareOptionsComponent title={trip.name} url={'www.jeroentravel.com'}/>

              <ContextOptionButtons onClick={this.handleTLDRMode}>
                <Icon id="ei-camera-icon"/>
                <p>TLDR mode</p>
              </ContextOptionButtons>
            </ContextButtons>

            {details && details.length > 0 && 
              <>
                {!tldrMode &&
                  <VerticalTimeline active={trip.active} tripItems={details} onClick={this.handleSegmentDetailClick}/>
                }
                {tldrMode &&
                  <VerticalTLDRTimeline/>
                }
              </>
            }
          </MaincontentContainer>
        </ScrollableTripContent>
      </>
    );
  }
}

export default TripDetailPage;