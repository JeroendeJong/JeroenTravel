import React, { useState, useEffect } from 'react';
import { ScrollableTripContent } from "./misc/common";
import styled from 'styled-components';
import Markdown from 'react-markdown';
import { getTravelTrip, getImageUrl } from '../../constants';
import { TripDetail } from './trip-details';
import drawerStore from '../common/drawer-store';
import { TripOverview } from './trips-item';
import Icon from '../common/evil-icon';
import TravelImage from './misc/image-view';
import { darken } from 'polished';

const LongDescription = styled.div`
  margin: 20px;
  font-weight: lighter;
  font-size: 14px;
  line-height: 1.4;
`;

const TEST_TEXT = `
![Image 1, what a great image innit mate.!](${getImageUrl('/assets/IMG_0334.jpg')}  "sup browksies")

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque dignissim arcu ante, vel aliquet nibh dictum non. In dictum maximus eros id dictum. Aliquam tristique tristique felis convallis rutrum. Suspendisse convallis lectus in nunc posuere finibus quis quis odio. Nulla commodo lacinia est, eu rutrum odio luctus quis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Etiam non convallis nulla.

![Image 1, what a great image innit mate.!](${getImageUrl('/assets/IMG_2569.jpg')})

Morbi a orci id ligula rhoncus mollis. Donec malesuada enim turpis. Nam ante lacus, molestie vitae metus sit amet, bibendum lacinia arcu. Sed id tellus ut nunc bibendum tincidunt finibus a turpis. Maecenas volutpat placerat lacinia. Proin id vehicula nulla. Donec nec placerat libero, vel imperdiet turpis. Donec molestie lacus justo, ut vehicula ipsum ullamcorper non.

Sed a porta turpis, eu eleifend enim. Fusce ut nunc eros. Maecenas efficitur sem non aliquet elementum. Cras facilisis finibus odio, tincidunt vulputate odio interdum ac. Proin nisi neque, tempus vitae imperdiet pulvinar, pellentesque a nisl. Sed in semper nisl. Pellentesque nec ex fermentum, bibendum tellus at, tempus leo. Nunc tempus vulputate neque sed aliquet. Duis ipsum metus, pharetra sit amet feugiat vitae, eleifend id enim. Nulla dui velit, blandit vel volutpat ac, vulputate ac diam. Praesent posuere, massa quis mattis consectetur, diam odio sollicitudin lectus, vel condimentum libero mi nec metus. Vivamus faucibus enim in semper facilisis. Aliquam neque sapien, varius eu nunc ut, egestas lobortis purus. Ut tincidunt, urna ac congue scelerisque, orci lectus ultricies lorem, in placerat leo purus at mi.

Aenean venenatis ex in nisi semper, ut ultricies lectus scelerisque. Donec accumsan ullamcorper cursus. Donec molestie sem et felis tristique tempus. Mauris rutrum massa eget pretium dapibus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Proin sed ligula nec velit ullamcorper iaculis. Sed nec ex eget odio lacinia venenatis vitae vitae leo. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam at massa molestie nisl feugiat semper. Phasellus porttitor fringilla fermentum. In at pretium ligula, quis rutrum sapien.

![Image 1, what a great image innit mate.!](${getImageUrl('/assets/IMG_2041.jpg')}) 

Aenean venenatis ex in nisi semper, ut ultricies lectus scelerisque. Donec accumsan ullamcorper cursus. Donec molestie sem et felis tristique tempus. Mauris rutrum massa eget pretium dapibus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Proin sed ligula nec velit ullamcorper iaculis. Sed nec ex eget odio lacinia venenatis vitae vitae leo. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam at massa molestie nisl feugiat semper. Phasellus porttitor fringilla fermentum. In at pretium ligula, quis rutrum sapien.

Aenean venenatis ex in nisi semper, ut ultricies lectus scelerisque. Donec accumsan ullamcorper cursus. Donec molestie sem et felis tristique tempus. Mauris rutrum massa eget pretium dapibus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Proin sed ligula nec velit ullamcorper iaculis. Sed nec ex eget odio lacinia venenatis vitae vitae leo. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam at massa molestie nisl feugiat semper. Phasellus porttitor fringilla fermentum. In at pretium ligula, quis rutrum sapien.

![Image 1, what a great image innit mate.!](${getImageUrl('/assets/IMG_0511.jpg')})
`;

const BottomNavigationBar = styled.div`
  position: absolute;
  bottom: 0;
  height: 100px;
  width: 100%;

  display: flex;
  justify-content: space-between;

  background-color: green;
`;

const SegmentNavigationButton = styled(Icon)`
  height: 50px;
  width: 50px;
`;

const SegmentTitle = styled.div`
  font-size: 30px;
  text-align: center;
`;

const MarkdownImage = styled(TravelImage)`
  width: 100%;
  height: 300px;
  object-fit: cover;
`;

const MarkdownImageDescription = styled.p`
  margin: 0;
  font-size: 12px;
`

const MarkdownParagph = styled.p`
  margin-left: 10px;
  margin-right: 10px;
  color: ${p => darken(0.2, p.theme.color.text)};
`;

interface Props {
  id: number;
  trip: TripOverview;
}

const custom = {
  image: (props: any) => {
    return (
      <>
        <MarkdownImage alt={props.alt} src={props.src}/>
        <MarkdownImageDescription>{props.title}</MarkdownImageDescription>
      </>
    )
  },
  text: (props: any) => {
    console.log(props);
    return (
      <MarkdownParagph>{props.children}</MarkdownParagph>
    )
  }
}

const TripSegmentDetailPage = (props: Props) => {
  const [data, setData] = useState<TripDetail[] | null>(null);
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


  useEffect(() => {
    drawerStore.emit('CONTENT_CLOSEABLE', 'TripSegmentDetailPage');
    drawerStore.emit('CONTENT_BACKABLE', 'TripSegmentDetailPage');
  }, []);

  if (!data) return null;

  const feature = data.find((f: any) => f.id === props.id);
  if (!feature) return null;

  return (
    <>
      <ScrollableTripContent title={feature.name} pixelOffset={100}>
        <SegmentTitle>{feature.name}</SegmentTitle>
        <Markdown source={feature.long_description || TEST_TEXT} renderers={custom} />
      </ScrollableTripContent>
      <BottomNavigationBar>
      
        <SegmentNavigationButton id={'ei-chevron-left-icon'}/>

        <SegmentNavigationButton id={'ei-chevron-right-icon'}/>

      </BottomNavigationBar>
    </>
  );
}

export default TripSegmentDetailPage;