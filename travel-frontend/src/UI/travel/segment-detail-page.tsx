import React, { useState, useEffect } from 'react';
import { TopLeftActionIconContainer, ScrollableTripContent, TripHeaderImage } from "./common";
import Icon from "../../evil-icon";
import styled from 'styled-components';
import { getTravelTrip, getImageUrL } from '../../constants';

const ActionContainerOffset = styled(TopLeftActionIconContainer)`
  left: 25px;
`;

const LongDescription = styled.div`
  margin: 20px;
  font-weight: lighter;
  font-size: 14px;
  line-height: 1.4;
`

const TripSegmentDetailPage = (props: any) => {
  const [data, setData] = useState<GeoJSON.FeatureCollection | null>(null);
  const [id] = useState(props.trip.id);

  useEffect(() => {
    let ignore = false;
    async function fetchData() {
      const url = getTravelTrip(parseInt(id));
      const json = await fetch(url).then(resp => resp.json())
      if (!ignore) setData(json)
    }

    fetchData();
    return () => { ignore = true; }
  }, [id]);

  if (!data) return null;

  const feature = data.features.find((f: any) => f.id === props.id);
  if (!feature || !feature.properties) return null;

  const properties = feature.properties;
  console.log(properties);
  

  return (
    <>
      <TopLeftActionIconContainer onClick={props.onClose}>
        <Icon id="ei-close-o-icon"/>
      </TopLeftActionIconContainer>
      <ActionContainerOffset onClick={props.onBack}>
        <Icon id="ei-arrow-left-icon"/>
      </ActionContainerOffset>
      <ScrollableTripContent>
        <LongDescription>{properties.long_description}</LongDescription>

      </ScrollableTripContent>
    </>
  );
}

export default TripSegmentDetailPage;