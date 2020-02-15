import React from 'react';
import styled from 'styled-components';


const LazyContainer = styled.div`
  text-align: center;
  font-size: 16px;
`

const VerticalTLDRTimeline = () => {
  return (
    <LazyContainer>
      <br/><br/><br/>
      Lazy Mode has not been implemented yet :(.
      <br/>
      So; be un-lazy <span aria-label="emoji" role="img">😅</span>
    </LazyContainer>
  );
};

export default VerticalTLDRTimeline;