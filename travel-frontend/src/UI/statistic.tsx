import React from 'react';
import styled from 'styled-components';

import Icon from '../evil-icon';

export interface BaseStatistic<T> {
  id: string,
  name: string,
  description: string,  
  data: T,
}

type Count = number;
type RangeKeyValuePair = Array<{count: number, value: string}>

const Card = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 15px;

  border-bottom: 1px solid #32657c;
`;

const CardMainInfo = styled.p`
  font-size: 20px;
  color: #ffa600;
  margin: 0;

  text-align: end;


  /* NOTE ONLY do this when dropdown is being used. */
  flex-grow: 2;
  margin-right: 5px;
`;

const CardText = styled.p`
  font-size: 14px;
  color: lightgray;
  margin: 0;
  margin-right: 20px;
`;

const CardMoreContent = styled(Card)`
  justify-content: start;
  border-bottom: 0px;
`;

const CardMoreContentText = styled(CardText)`
  margin-left: 20px;
`;

const CardMoreContentInfo = styled(CardMainInfo)`
  font-size: 14px;
  flex-grow: 0;
`;

interface Props {
  data: BaseStatistic<Count | RangeKeyValuePair>
}

interface State {
  dropdownActive: boolean;
}

class Statistic extends React.Component<Props, State>  {

  public state = {
    dropdownActive: false
  }

  private handleDropdown = () => {
    this.setState(oldState => ({dropdownActive: !oldState.dropdownActive}));
  }

  private renderTopFiveCards = () => {
    const {data} = this.props.data;

    if (typeof data !== 'object') return null;

    return data.slice(1, 5).map((val, idx) => {
      return (
        <CardMoreContent key={val.value}>
          <CardMoreContentText>{idx + 2}.</CardMoreContentText>
          <CardMoreContentInfo>{val.value}</CardMoreContentInfo>
        </CardMoreContent>
      )
    })
  }

  public render() {
    const {data} = this.props;

    if (typeof data.data === 'object') {
      return (
        <>
          <Card onClick={this.handleDropdown}>
            {this.state.dropdownActive &&
              <Icon id={'ei-chevron-up-icon'}/>
            }
            {!this.state.dropdownActive &&
              <Icon id={'ei-chevron-down-icon'}/>
            }
            <CardText>{data.name}</CardText>
            <CardMainInfo>{data.data[0].value}</CardMainInfo>
          </Card>
          {this.state.dropdownActive && this.renderTopFiveCards()}
        </>
      );
    }
  
    return (
      <Card>
        <CardText>{data.name}</CardText>
        <CardMainInfo>{data.data}</CardMainInfo>
      </Card>
    );
  }

}

export default Statistic;