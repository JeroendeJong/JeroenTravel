import React from 'react';
import styled from "styled-components";
import Statistic, { BaseStatistic } from './statistic';
import { PrimaryButton } from './buttons';
import FlightsList from './flights-list';
import AirportList from './airports-list';
import { opacify } from 'polished';
import {getStatisticsURL} from '../../constants';
import ScrollableView from '../common/scroll-view';

const FullWidthContainer = styled.div` 
  width: 100%; 
  display: flex;
  justify-content: space-around;

  margin-bottom: 5px;
  margin-top: 15px;

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

const OffsetScrollableView = styled(ScrollableView)`
  height: calc(100% - 65px);
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
            <OffsetScrollableView 
              data-scroll-shadow={this.state.scrollShadow} 
              onScroll={this.handleScrollChange}
            >
              {this.state.stats.map(
                (s: BaseStatistic<any>) => {
                  return <Statistic data={s} key={s.id}/>
                })
              }
            </OffsetScrollableView>
          }

        {this.state.screenType === ScreenTypes.FlightList &&
          <OffsetScrollableView 
            data-scroll-shadow={this.state.scrollShadow} 
            onScroll={this.handleScrollChange}
          >
            <FlightsList/>
          </OffsetScrollableView>
        }

        {this.state.screenType === ScreenTypes.AirportList &&
          <OffsetScrollableView 
            data-scroll-shadow={this.state.scrollShadow} 
            onScroll={this.handleScrollChange}
          >
            <AirportList/>
          </OffsetScrollableView>
        }
      </>
    )
  }


}

export default MainScreen;