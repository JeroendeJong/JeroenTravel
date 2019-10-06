import React from 'react';
import { TripOverview } from './trip-overview-item';
import { getTravelTrip, getImageUrL } from '../../constants';
import map from '../../map';
import styled from 'styled-components';
import ScrollableView from '../common/scroll-view';
import TravelImage from './image-view';
import TimelineHeader from './timeline/header';
import TimelineBody from './timeline/body';
import Icon from '../../evil-icon';
import mapboxgl from 'mapbox-gl';
import { isMobile } from '../../mobile';

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

interface ComponentProps {
  trip: TripOverview;
  onClose: () => void;
}

interface ComponentState {
  details: any;
}

const TripHeaderImage = styled(TravelImage)`
  width: 100%;
  border-radius: 6px;
  height: 200px;
  object-fit: cover;
`;

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

const CloseIconContainer = styled.div`
  position: absolute;
  margin-top: 5px;
  margin-left: 5px;

  mix-blend-mode: difference;

  svg {
    width: 30px;
    height: 30px;
  }
`;

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

        //NOTE: put this somewhere else. it'll do for now i guess. 
        const bounds = coords.reduce((bounds: any, coord: number[]) => {
          return bounds.extend(coord);
        }, new mapboxgl.LngLatBounds(coords[0], coords[0]));
           
        if (isMobile()) {
          map.map!.fitBounds(bounds, {padding: {
            bottom: 350, 
            top: 20, 
            right: 20, 
            left: 20
          }});
        } else {
          map.map!.fitBounds(bounds, {padding: {
            bottom: 60, 
            top: 60, 
            right: 60, 
            left: 430
          }});
        }
        
      });
  }

  public componentWillUnmount(): void {
    map.clearTravelLayer();
  }

  public render(): JSX.Element {
    const details: any = this.state.details;
    const {trip} = this.props;
    return (
      <>
        <CloseIconContainer onClick={this.props.onClose}>
          <Icon id="ei-close-o-icon"/>
        </CloseIconContainer>
        <ScrollableView>
          <TripHeaderImage src={getImageUrL(trip.header_image_url)}/>
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
                        <>
                          <TimelineHeader title={item.name}/>
                          <TimelineBody body={item.short_description}/>
                        </>
                      )
                    })
                  }
                </TimelineContainer>
              </>
            }
          </MaincontentContainer>
          </ScrollableView>
        </>
    )

  }
}

export default TripDetailPage;