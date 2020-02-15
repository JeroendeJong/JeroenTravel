import React from 'react';
import styled, { keyframes } from 'styled-components';
import Icon from '../../common/evil-icon';

import Error404Icon from '../icons/error-404';

interface ComponentProps extends React.ImgHTMLAttributes<HTMLImageElement> {
}

const SpinAnim = keyframes`
  100% {
    transform: rotate(360deg);
  }
`;

const RotatingIcon = styled(Icon)`
  animation: ${SpinAnim} linear 1s infinite;

  width: 20%;
  height: 100%;
`;

const FallBackStyle = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FailureContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

class TravelImage extends React.Component<ComponentProps, any> {

  public state = {
    loaded: false,
    failure: false
  }

  private handleImageLoad = () => {
    this.setState({loaded: true});
  }

  private handleImageError = () => {
    this.setState({failure: true});
  }

  public render(): any {
    if (this.state.failure) {
      return (
        <FailureContainer className={this.props.className}>
          <Error404Icon/>
          <p>No image found</p>
        </FailureContainer>
      )
    }

    const imageVisibleStyle = this.state.loaded ? {} : { display: 'none' };
    const fallbackstyle = this.state.loaded ? { display: 'none' } : {}

    return (
      <>
        <img alt='' {...this.props} style={imageVisibleStyle} onLoad={this.handleImageLoad} onError={this.handleImageError}/>
        <FallBackStyle style={fallbackstyle} className={this.props.className}>
          <RotatingIcon id={'ei-spinner-3-icon'}/>
        </FallBackStyle>
      </>
    );
  }
}

export default TravelImage;