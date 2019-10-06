import React from 'react';
import styled, { keyframes } from 'styled-components';
import Icon from '../../evil-icon';


interface ComponentProps extends React.ImgHTMLAttributes<HTMLImageElement> {
}

const SpinAnim = keyframes`
  100% {
    transform: rotate(360deg);
  }
`

const RotatingIcon = styled(Icon)`
  animation: ${SpinAnim} linear 1s infinite;

  width: 20%;
  height: 100%;
`;

const FallBackStyle = styled.div`
  display: flex;
  justify-content: center;
`;

class TravelImage extends React.Component<ComponentProps, any> {

  public state = {
    loaded: false
  }

  private handleImageLoad = () => {
    console.log('loadf');
    this.setState({loaded: true});
  }

  public render(): any {
    const imageVisibleStyle = this.state.loaded ? {} : { display: 'none' };
    const fallbackstyle = this.state.loaded ? { display: 'none' } : {}

    return (
      <>
        <img style={imageVisibleStyle} {...this.props} onLoad={this.handleImageLoad} />
        <FallBackStyle style={fallbackstyle} className={this.props.className}>
          <RotatingIcon id={'ei-spinner-3-icon'}/>
        </FallBackStyle>
      </>
    );
  }
}

export default TravelImage;