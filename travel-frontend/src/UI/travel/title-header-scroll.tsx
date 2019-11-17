import React, { useEffect } from 'react';
import drawerStore from '../common/drawer-store';
import styled from 'styled-components';
import { darken } from 'polished';

const SmallHeaderTitle = styled.div` 
  text-align: center;
  width: 100%;
  color: ${(p: any) => darken(0.5, p.theme.color.text)};
  font-size: 20px; 

  /* ensure text never exceeds container */
  text-overflow: ellipsis;
  white-space: pre;
  overflow: hidden;
`;


interface Props {
  title: String;
  pixelOffset: number;
  children: any;
}

const withHeaderTitleScrollContext = (Component: any) => (props: Props) => {

  const handleScroll = (e: React.MouseEvent<any>) => {
    const scrolllContainerValue = e.currentTarget.scrollTop;
    if (scrolllContainerValue > props.pixelOffset) {
      drawerStore.setTopContent(
        <SmallHeaderTitle>{props.title}</SmallHeaderTitle>
      );
    } else {
      drawerStore.setTopContent(null);
    }
  }

  useEffect(() => {
    return () => {
      drawerStore.setTopContent(null);
    };
  }, []);

  return <Component {...props } onScroll={handleScroll} />;
};


export default withHeaderTitleScrollContext;