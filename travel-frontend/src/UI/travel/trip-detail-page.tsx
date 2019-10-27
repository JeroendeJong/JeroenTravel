import React from 'react';
import { TripOverview } from './trip-item';
import { getTravelTrip, getImageUrl, getTravelTripGeometry } from '../../constants';
import map from '../../map';
import {coordinatesToBounds, centreOnBounds} from '../../map/utils';
import styled from 'styled-components';
import TimelineHeader from './timeline/header';
import TimelineBody from './timeline/body';
import { ScrollableTripContent, TripHeaderImage } from './misc/common';
import TripSegmentImagePreviews from './trip-segment-image-previews';
import drawerStore from '../common/drawer-store';
import {isOutOfViewport} from '../utils';
import { lighten } from 'polished';

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
  padding: 15px;
`;

const TripName = styled.div`
  text-align: center;
  font-size: 40px;
  width: 100%;
`;

const SmallTripName = styled(TripName)` font-size: 20px; `

const TripBody = styled.div`
  font-size: 14px;
  text-align: center;
`;

const TimelineContainer = styled.div`
  margin-left: 10px;
`;

const TimelineShortDescription = styled.p`
  font-size: 14px;
  color: ${p => lighten(0.2, p.theme.color.primary)}
`;

const LineSpacer = styled.div`
  height: 30px;
  border-bottom: 1px solid ${p => p.theme.color.primary};
  opacity: 0.2;
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

  private test = () => {
    // Ddoessnt work great yet. certainly mobile. please use this instead: 
    // https://stackoverflow.com/questions/34332575/detect-when-div-scrolls-out-of-view
    const el = document.getElementById('testmmos');
    if (el) {
      const isout = isOutOfViewport(el);
      if (isout.any === true) {
        const {trip} = this.props;
        drawerStore.setTopContent(
          <SmallTripName>{trip.name}</SmallTripName>
        );
      } else {
        drawerStore.setTopContent(null);
      }
    }
  }

  public render(): JSX.Element {
    const details: any = this.state.details;
    const {trip} = this.props;
    return (
      <>
        <ScrollableTripContent onScroll={this.test}>
          <TripHeaderImage src={getImageUrl(trip.header_image_url)} alt="Travel Trip Header image"/>
          <MaincontentContainer>
            <TripName id="testmmos">{trip.name}</TripName>
            <TripBody>
              {trip.description}
            </TripBody>
            <LineSpacer/>
            {details && details.length > 0 && 
              <>
                <TimelineContainer>
                  {details.map((item: TripDetail) => {
                      return (
                        <div key={item.id}>
                          <TimelineHeader id={item.id} title={item.name} onClick={this.handleSegmentDetailClick}/>
                          <TimelineBody>
                            <TripSegmentImagePreviews imageUrls={item.header_image_url}/>
                            <TimelineShortDescription>{item.short_description}</TimelineShortDescription>
                          </TimelineBody>
                        </div>
                      )
                    })
                  }
                </TimelineContainer>
              </>
            }
          </MaincontentContainer>
        </ScrollableTripContent>
      </>
    );
  }
}

export default TripDetailPage;