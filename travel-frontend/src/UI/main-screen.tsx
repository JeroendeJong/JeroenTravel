import React from 'react';
import styled from "styled-components";
import Statistic, { BaseStatistic } from './statistic';
import { PrimaryButton } from './buttons';

const ScrollableView = styled.div`
  overflow-y: scroll;
  height: 90%;

  margin-left: -25px;
  margin-right: -25px;
  padding-right: 15px;
  padding-left: 15px;

  ${p => {
    if ((p as any)['data-scroll-shadow']) {
      return `
        box-shadow: inset 0px 4px 21px -9px rgba(0,0,0,1);
      `;
    }
  }}
`;

const FullWidthContainer = styled.div` 
  width: 100%; 
  display: flex;
  justify-content: space-around;

  margin-bottom: 5px;
`;

const TopLevelNavigationButton = styled(PrimaryButton)`
  width: 45%;
  min-width: 80px;
`;

interface State {
  stats: BaseStatistic<{}>[],
  scrollShadow: boolean
}

class MainScreen extends React.Component<any, State> {

  public state = {
    stats: [],
    scrollShadow: false
  }

  public async componentDidMount() {
    const stats = await fetch('http://localhost:8080/flights/stats')
      .then(resp => resp.json())

    this.setState({stats});
  }

  public handleScrollChang = (e: any) => {
    if (e.target.scrollTop > 2) {
      this.setState({scrollShadow: true});
    } else {
      this.setState({scrollShadow: false});
    }
  }
 

  public render(): JSX.Element {
    return (
      <>
        <FullWidthContainer>
          <TopLevelNavigationButton text={'Airports'} onclick={Function}/>
          <TopLevelNavigationButton text={'Flights'} onClick={Function}/>
        </FullWidthContainer>
        <ScrollableView 
          data-scroll-shadow={this.state.scrollShadow} 
          onScroll={this.handleScrollChang}
        >
          {this.state.stats.map((s: BaseStatistic<any>) => {
            return <Statistic data={s} key={s.id}/>
          })
          }
        </ScrollableView>
      </>
    )
  }


}

export default MainScreen;