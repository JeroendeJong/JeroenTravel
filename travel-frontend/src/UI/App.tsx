import React from 'react';
import styled, { css } from 'styled-components';
import Slider from 'react-slick';

const settings = {
  dots: true,
  infinite: false,
  arrows: false,
  swipeToSlide: true
};

const FloatingBottomDrawer = css`
  position: absolute;
  left: 10px;
  right: 10px;
  bottom: 10px;
`

const Drawer = styled.div`
  ${FloatingBottomDrawer}
  height: 33%;
  z-index: 2;
  background-color: #003f5c;
  color: white;
  box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.50);
  border-radius: 6px;
  padding: 15px;

  .slick-dots {
    margin-bottom: 20px;
  }

  .slick-dots li.slick-active button:before {
    color: white !important
  }
`;

const Title = styled.h1`
  text-align: center;
  margin: 0;
  font-size: 30px;
`

const Card = styled.div`
  text-align: center;
  margin: 0
`;

const CardMainInfo = styled.p`
  font-size: 50px;
  color: #ffa600;
  margin: 0;
`

const CardText = styled.p`
  font-size: 22px;
  color: lightgray;
  margin: 0;
`;

function App() {
  return (
    <Drawer>
      <Title>My Flight Stats</Title>
      <Slider {...settings}>
        <Card>
          <CardMainInfo>18</CardMainInfo>
          <CardText>Unique airports visited</CardText>
        </Card>
        <Card>
          <CardMainInfo>12.000 KM</CardMainInfo>
          <CardText>Travelled on planes</CardText>
        </Card>

        <Card>
          <CardMainInfo>Amsterdam Schiphol</CardMainInfo>
          <CardText>Most visited Airport</CardText>
        </Card>
      </Slider>
    </Drawer>
  );
}

export default App;
