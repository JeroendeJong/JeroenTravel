import React from 'react';
import styled from "styled-components";
import { PrimaryButton } from './buttons';

const Card = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px;

  border-bottom: 1px solid lightgray;
`;

const CardMainInfo = styled.p`
  font-size: 20px;
  color: #ffa600;
  margin: 0;

  text-align: end;
`;

const CardText = styled.p`
  font-size: 14px;
  color: lightgray;
  margin: 0;
`;

const FullWidthContainer = styled.div` 
  width: 100%; 
  display: flex;
  justify-content: space-around;
`;

const TopLevelNavigationButton = styled(PrimaryButton)`
  width: 45%;
  min-width: 80px;
`

class MainScreen extends React.Component<any> {


  public async componentDidMount() {
    // const stats = await fetch('http://localhost:8080/flights/stats')
    //   .then(resp => resp.json())

    //TODO implement stats properly.
  }


  public render(): JSX.Element {

    return (
      <>
        <FullWidthContainer>
          <TopLevelNavigationButton text={'Airports'} onclick={Function}/>
          <TopLevelNavigationButton text={'Flights'} onClick={Function}/>
        </FullWidthContainer>
        <div>
          <Card>
            <CardText>Unique airports visited</CardText>
            <CardMainInfo>18</CardMainInfo>
          </Card>
          <Card>
            <CardText>Travelled on planes</CardText>
            <CardMainInfo>12.000 KM</CardMainInfo>
          </Card>

          <Card>
            <CardText>Most visited Airport</CardText>
            <CardMainInfo>Amsterdam Schiphol</CardMainInfo>
          </Card>
        </div>
      </>
    )
  }


}

export default MainScreen;