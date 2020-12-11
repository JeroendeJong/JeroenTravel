import React, { useRef } from "react"
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock"
import { animated } from "react-spring"
import useVelocityTrackedSpring from "../../animation/useVelocityTrackedSpring"
import { useDrag } from "react-use-gesture"
import {
  rubberBandIfOutOfBounds,
  findNearestNumberInArray,
  projection,
  IsMovementSmall,
  isMovementIntentional
} from "../../animation/utilities";
import useWindowSize from '../../animation/useWindowSize';

import DrawerInstance from './drawer';
import styled from "styled-components"
import { MOBILE_BREAKPOINT } from "../../mobile"
import { darken } from "polished"

export const Drawer: any = styled.div<{height: number, $windowHeight: number}>`
  background-color: ${props => props.theme.color.secondary};
  z-index: 2;

  padding-left: env(safe-area-inset-left);

  @media only screen and (min-width: ${MOBILE_BREAKPOINT}px) {
    position: fixed;
    left: 0px;
    right: 0px;
    bottom: 0px;

    min-width: 400px;
    max-width: 700px;
    width: 50%;
    top: 0px;
    border-radius: 0px;
  }

  @media only screen and (max-width: ${MOBILE_BREAKPOINT}px) {
    touch-action: none;
    will-change: transform;
    position: fixed;
    height: ${props => props.height}px;
    border-top: 1px solid ${props => darken(0.2, props.theme.color.secondary)};
    top: ${props => props.$windowHeight - 150}px;
    min-height: calc(100vh + 500px);
    width: 100%;
    box-shadow: 0 -3px 10px hsla(0, 0%, 0%, 0.07);
  }
`;

const drawerHeight = 160;
const SPRING_CONFIG =        { tension: 247, friction: 27 };
const DAMPED_SPRING_CONFIG = { tension: 247, friction: 33 };
const VELOCITY_SPRING_CONFIG = { y: 0, config: SPRING_CONFIG };

const TabComponent = (props: any) => {
  const nowPlayingDrawerRef: any = useRef(null);
  const {height, width} = useWindowSize();
  const [{ y }, set] = useVelocityTrackedSpring(() => VELOCITY_SPRING_CONFIG);
  
  const stops = [ 0, -(height! - drawerHeight - 100)]

  const setDrawerOpen = () => {
    set({
      y: stops[1],
      config: DAMPED_SPRING_CONFIG,
      immediate: false
    })
  }

  const bind: any = useDrag(
    ({
      vxvy: [, velocityY],
      movement: [movementX, movementY],
      last,
      memo, // the already done movement before we've realised its a movement.
      event
    }) => {
      if (width! >= MOBILE_BREAKPOINT) return;

      let drawerIsOpen = y.value <= stops[1];
      if (!drawerIsOpen) event!.preventDefault();

      const isClick = last && IsMovementSmall({movementX, movementY}) && !drawerIsOpen
      if (isClick) return setDrawerOpen()

      // Ok. The user started moving, Is it intentional?
      if (!memo) {
        if (!isMovementIntentional({movementX, movementY})) return;
        // disabling body scroll size we are actually gonna start draggin.
        disableBodyScroll(nowPlayingDrawerRef.current)
        memo = y.value - movementY
      }

      // Ok. The user has let go. Which Stop point should we snap to? 
      if (last) {
        enableBodyScroll(nowPlayingDrawerRef.current)

        const projectedEndpoint = y.value + projection(velocityY)
        const point = findNearestNumberInArray(projectedEndpoint, stops)

        drawerIsOpen = y.value <= stops[1];

        if (drawerIsOpen) {
          enableBodyScroll(nowPlayingDrawerRef.current);
        }

        return set({
          y: point,
          immediate: false,
          config: SPRING_CONFIG
        })
      }

      if (drawerIsOpen) {
        return enableBodyScroll(nowPlayingDrawerRef.current);
      }

      // Ok. This is not the last one, and the user is still busy moving.
      // Lets update to reflect the latest drag action.s
      set({
        y: rubberBandIfOutOfBounds(
          stops[stops.length - 1],
          stops[0],
          movementY + memo,
          0.08
        ),
        immediate: true
      });
      return memo
    },
    {
      domTarget: nowPlayingDrawerRef,
      event: { passive: false }
    }
  );

  React.useEffect(bind, [bind])
  return (
    <>
      <Drawer
        ref={nowPlayingDrawerRef}
        height={drawerHeight}
        $windowHeight={height}
        as={animated.div}
        style={{
          transform: y.interpolate((y: number) => `translate3D(0, ${y}px, 0)`)
        }}
      >
        <DrawerInstance>
          {props.children}
        </DrawerInstance>
      </Drawer>
    </>
  )
}

export default TabComponent
