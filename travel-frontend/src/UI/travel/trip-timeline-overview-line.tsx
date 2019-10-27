import React from 'react';
import Draggable from 'react-draggable';
import styled from 'styled-components';


const Handle = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50px;
  background-color: green;
`;

const Line = styled.div`
  height: 1px;
  background-color: red;
`;

const TripTimelineOverviewLine = () => {
  return (
    <>
      {/* <Draggable
        axis="x"
        handle=".handle"
        defaultPosition={{x: 0, y: 0}}
        // position={undefined}
        grid={[5, 5]}
        scale={1}
        // onStart={this.handleStart}
        // onDrag={this.handleDrag}
        // onStop={this.handleStop}
      >
        <Handle className="handle"/>
      </Draggable>
      <Line/> */}
    </>
  );
}

export default TripTimelineOverviewLine;