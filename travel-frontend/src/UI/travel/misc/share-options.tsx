import React from 'react';
import { ContextOptionButtons } from './common';
import Icon from '../../common/evil-icon';



interface Props {
  url?: string;
  text?: string;
  title?: string;
}

const ShareOptionsComponent = (props: Props) => {
  // navigator.share see: https://developer.mozilla.org/en-US/docs/Web/API/Navigator/share
  if ((navigator as any).share) {
    const handleNavigatorShare = () => (navigator as any).share(props);
    return (
      <ContextOptionButtons onClick={handleNavigatorShare}>
        <Icon id="ei-share-apple-icon"/>
      </ContextOptionButtons>
    )
  }

  const text = escape(
    `Follow ${(props.title && props.title + '-') || ''} ${(props.text && props.text + '-') || ''} ${props.url || ''}`
  );

  //fallback incase share does not exist. 
  return (
    <>
      <ContextOptionButtons 
        href={`https://twitter.com/intent/tweet?text=${text}`} 
        rel="noopener noreferrer" 
        target="_blank"
      >
        <Icon id="ei-sc-twitter-icon"/>
      </ContextOptionButtons>

      <ContextOptionButtons
        href={`https://facebook.com`} 
        rel="noopener noreferrer" 
        target="_blank"
      >
        <Icon id="ei-sc-facebook-icon"/>
      </ContextOptionButtons>
    </>

  );
}

export default ShareOptionsComponent;