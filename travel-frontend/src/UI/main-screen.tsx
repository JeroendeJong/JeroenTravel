import React from 'react';
import styled from "styled-components";
import Statistic, { BaseStatistic } from './statistic';
import { PrimaryButton } from './buttons';
import FlightsList from './flights-list';
import AirportList from './airports-list';
import { opacify } from 'polished';
import {getStatisticsURL} from '../constants';

const ScrollableView = styled.div`
  overflow-y: scroll;
  height: calc(100% - 35px);
  border-radius: 6px;

  margin-left: -15px;
  margin-right: -15px;

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

  border-bottom: ${p => opacify(0.9, p.theme.color.primary)}
  padding-bottom: 10px;
`;

const TopLevelNavigationButton = styled(PrimaryButton)`
  width: 45%;
  min-width: 80px;


  ${(p: any) => {
    if (p.active) return `
      background-color: ${p.theme.color.highlight};
    `;
    return '';
  }}
`;

interface State {
  stats: BaseStatistic<{}>[],
  scrollShadow: boolean,
  screenType: ScreenTypes
}

enum ScreenTypes {
  Stats = 'Stats',
  FlightList = 'FlightList',
  AirportList = 'AirportList'
}

class MainScreen extends React.Component<any, State> {

  public state = {
    stats: [],
    scrollShadow: false,
    screenType: ScreenTypes.Stats
  }

  public async componentDidMount() {
    const stats = await fetch(getStatisticsURL())
      .then(resp => resp.json())

    this.setState({stats});
  }

  public handleScrollChange = (e: any) => {
    if (e.target.scrollTop > 2) {
      this.setState({scrollShadow: true});
    } else {
      this.setState({scrollShadow: false});
    }
  }

  public handleAirportListClick = () => this.setState({screenType: ScreenTypes.AirportList, scrollShadow: false});
  public handleFlightListClick = () => this.setState({screenType: ScreenTypes.FlightList, scrollShadow: false});
  public handleStatsClick = () => this.setState({screenType: ScreenTypes.Stats, scrollShadow: false});

  public render(): JSX.Element {
    return (
      <>
        <FullWidthContainer>
          <TopLevelNavigationButton 
            text={'Statistics'} 
            active={this.state.screenType === ScreenTypes.Stats} 
            onClick={this.handleStatsClick}
          />
          <TopLevelNavigationButton 
            text={'Flights'} 
            active={this.state.screenType === ScreenTypes.FlightList} 
            onClick={this.handleFlightListClick}
          />
          <TopLevelNavigationButton 
            text={'Airports'} 
            active={this.state.screenType === ScreenTypes.AirportList} 
            onClick={this.handleAirportListClick}
          />
        </FullWidthContainer>
          {this.state.screenType === ScreenTypes.Stats &&
            <ScrollableView 
              data-scroll-shadow={this.state.scrollShadow} 
              onScroll={this.handleScrollChange}
            >
              {this.state.stats.map(
                (s: BaseStatistic<any>) => {
                  return <Statistic data={s} key={s.id}/>
                })
              }
            </ScrollableView>
          }

        {this.state.screenType === ScreenTypes.FlightList &&
          <ScrollableView 
            data-scroll-shadow={this.state.scrollShadow} 
            onScroll={this.handleScrollChange}
          >
            <FlightsList/>
          </ScrollableView>
        }

        {this.state.screenType === ScreenTypes.AirportList &&
          <ScrollableView 
            data-scroll-shadow={this.state.scrollShadow} 
            onScroll={this.handleScrollChange}
          >
            <AirportList/>
          </ScrollableView>
        }
      </>
    )
  }


}

export default MainScreen;