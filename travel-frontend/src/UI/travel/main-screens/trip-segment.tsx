import React, { useState, useEffect } from 'react';
import { ScrollableTripContent } from "../misc/common";
import styled from 'styled-components';
import Markdown from '../misc/travel-markdown';
import { getTravelSegment } from '../../../constants';
import drawerStore from '../../common/drawer-store';
import withTripsData from '../with-trips-data';
import { withRouter } from 'react-router';
import TripPhotoHandler from '../map-photos/trip-map-photos-renderer';
import { TripOverview, TripSegment } from '../types';
import { coordinatesToBounds, centreOnBounds } from '../../../map/utils';
import { setTravelSegmentHighlight, clearTravelSegmentHighlight } from '../../../map/style';
import Logger from '../../../Logger';

const TEST_TEXT = `
  Story yet to be written. Sorry.
`;

const SegmentTitle = styled.div`
  font-size: 30px;
  color: ${p => p.theme.color.text};
  text-align: center;
`;

interface Props {
  id: number;
  trip: TripOverview;
}

const TripSegmentDetailPage = (props: any) => {
  const segmentId = parseInt(props.match.params.segmentID, 10);
  const [data, setData] = useState<TripSegment | null>(null);
  const [id] = useState(props.trip.id);

  useEffect(() => {
    let ignore = false;
    async function fetchData() {
      const url = getTravelSegment(segmentId);
      const json = await fetch(url).then(resp => resp.json())
      if (!ignore) {
        setData(json);

        setTravelSegmentHighlight(segmentId);

        if (!json.extent?.coordinates) {
          Logger.warn('Trip segment does not have any geometry attached!');
          return;
        }
        console.log(json.extent);
        const bounds = coordinatesToBounds(json.extent.coordinates[0]);
        centreOnBounds(bounds, {activeUserLocation: false});
      }
    }

    fetchData();
    return () => { 
      ignore = true; 
      clearTravelSegmentHighlight();
    }
  }, [id]);


  useEffect(() => {
    drawerStore.emit('CONTENT_CLOSEABLE', 'TripSegmentDetailPage');
    drawerStore.emit('CONTENT_BACKABLE', 'TripSegmentDetailPage');
  }, []);


  if (!data) return null;

  return (
    <>
      <TripPhotoHandler data={data}/>
      <ScrollableTripContent title={data.name} pixelOffset={100}>
        <SegmentTitle>{data.name}</SegmentTitle>
        <Markdown source={data.long_description || TEST_TEXT}/>
      </ScrollableTripContent>
    </>
  );
}

export default withRouter(withTripsData(TripSegmentDetailPage));