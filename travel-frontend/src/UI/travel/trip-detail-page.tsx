import React from 'react';
import { TripOverview } from './trip-overview-item';
import { getTravelTrip, getImageUrL } from '../../constants';
import map from '../../map';
import styled from 'styled-components';
import ScrollableView from '../common/scroll-view';
import TravelImage from './image-view';

interface ComponentProps {
  trip: TripOverview;
}

interface ComponentState {
  details: any
}

const TripHeaderImage = styled(TravelImage)`
  width: 100%;
  border-radius: 6px;
  height: 200px;
  object-fit: cover;
`;

const MaincontentContainer = styled.div`
  padding: 15px;

  border-bottom 1px solid gray;
`;

const TripName = styled.div`
  text-align: center;
  font-size: 40px;
  width: 100%;
`

class TripDetailPage extends React.Component<ComponentProps, ComponentState> {

  public state = {
    details: null
  }

  public componentDidMount(): void {
    const {trip} = this.props;
    fetch(getTravelTrip(parseInt(trip.id)))
      .then(resp => resp.json())
      .then(json => {
        map.setTravelLayer(json);
        this.setState({details: json})
      });

  }

  public render(): JSX.Element {
    const {details} = this.state;
    const {trip} = this.props;
    return (
      <ScrollableView>
        <TripHeaderImage src={getImageUrL(trip.header_image_url)}/>
        <MaincontentContainer>
          <TripName>{trip.name}</TripName>
        </MaincontentContainer>
      <div>
        hi
      </div>
      </ScrollableView>
    )

  }
}

export default TripDetailPage;