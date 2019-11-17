import React from 'react';
import styled, { keyframes } from 'styled-components';
import Icon from '../../common/evil-icon';

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

class TravelImage extends React.Component<ComponentProps, any> {

  public state = {
    loaded: false
  }

  private handleImageLoad = () => {
    this.setState({loaded: true});
  }

  public render(): any {
    const imageVisibleStyle = this.state.loaded ? {} : { display: 'none' };
    const fallbackstyle = this.state.loaded ? { display: 'none' } : {}

    return (
      <>
        <img alt='' {...this.props} style={imageVisibleStyle} onLoad={this.handleImageLoad} />
        <FallBackStyle style={fallbackstyle} className={this.props.className}>
          <RotatingIcon id={'ei-spinner-3-icon'}/>
        </FallBackStyle>
      </>
    );
  }
}

export default TravelImage;