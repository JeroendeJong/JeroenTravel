import React from 'react';
import TravelImage from './misc/image-view';
import {getImageUrl} from '../../constants';
import styled from 'styled-components';

const seperateImageUrls = (imgURLs: string) => imgURLs.split(',');

const PreviewImage = styled(TravelImage)`
  width: 120px;
  height: 80px;

  margin-left: 2px;
  margin-right: 2px;
  margin-top: 5px;
  margin-bottom: 5px;

  border-radius: 2px;
  object-fit: cover;
`;

const PreviewImageContainer = styled.div`
  overflow-x: hidden;
  height: 80px;
`

const TripSegmentImagePreviews = (props: any) => {
  if (!props.imageUrls) return null;

  const urls = seperateImageUrls(props.imageUrls);

  return (
    <PreviewImageContainer>
      {urls.slice(0, 3).map(url => <PreviewImage key={url} src={getImageUrl(url.trim())}/>)}
    </PreviewImageContainer>
  );
}

export default TripSegmentImagePreviews;
