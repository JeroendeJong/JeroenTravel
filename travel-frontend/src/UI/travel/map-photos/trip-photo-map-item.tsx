import React from 'react';
import styled from 'styled-components';
import { TripSegmentPhotos } from '../types';
import mapboxgl from 'mapbox-gl';
import map from '../../../map';
import { getImageUrl } from '../../../constants';


const MiniImage = styled.img`
  width: 20px;
  height: 20px;
  border: 1px solid white;
  border-radius: 50px;
`;

interface Props {
  photo: TripSegmentPhotos
}

class TripPhotoMapItem extends React.Component<Props> {
  private ref: React.RefObject<any>;
  private marker?: mapboxgl.Marker;

  constructor(props: Props) {
    super(props);

    this.ref = React.createRef();
  }

  public componentWillUnmount() {
    this.marker!.remove();
  }

  public componentDidMount() {
    const {photo} = this.props;
    const coords: number[] = photo.geom.coordinates;

    this.marker = new mapboxgl.Marker({
      element: this.ref.current
    })
      .setLngLat(coords as [number, number])
      .addTo(map.map!);
  }

  public render() {
    const {photo} = this.props;
    return (
     <div>
        <div ref={this.ref}>
          <MiniImage src={getImageUrl(photo.link_id)}/>
        </div>
     </div>
    )
  }



}

export default TripPhotoMapItem