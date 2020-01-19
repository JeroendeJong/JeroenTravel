import React from 'react';
import TripPhotoMapItem from './trip-photo-map-item';
import { TripDetail } from '../types';

interface Props {
  data: TripDetail;
}

class TripPhotoHandler extends React.Component<Props> {

  public componentDidUpdate() {
    console.log('d')
  }

  public componentDidMount() {
    console.log(this.props);
  }

  public render() {
    return this.props.data.photos.map(photo => {
      return <TripPhotoMapItem photo={photo}/>
    }) 
  }
}

export default TripPhotoHandler;