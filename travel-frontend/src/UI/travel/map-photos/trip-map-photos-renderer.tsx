import React from 'react';
import TripPhotoMapItem from './trip-photo-map-item';
import { TripSegment } from '../types';

interface Props {
  data: TripSegment;
}

class TripPhotoHandler extends React.Component<Props> {

  public componentDidUpdate() {
    console.log('d')
  }

  public componentDidMount() {
    console.log(this.props);
  }

  public render() {
    if (!this.props.data.photos) return null;
    return this.props.data.photos.map(photo => {
      return <TripPhotoMapItem key={photo.link_id} photo={photo}/>
    }) 
  }
}

export default TripPhotoHandler;