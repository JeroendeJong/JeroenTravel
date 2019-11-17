import React from 'react';
import styled from 'styled-components';
import TravelImage from './image-view';
import { darken } from 'polished';
import Markdown from 'react-markdown';


const MarkdownImage = styled(TravelImage)`
  width: 100%;
  height: 300px;
  object-fit: cover;
`;

const MarkdownImageDescription = styled.span`
  margin: 0;
  display: block;
  font-size: 12px;
`;

const MarkdownParagraph = styled.span`
  display: block;
  margin-left: 10px;
  margin-right: 10px;
  font-size: 14px;
  line-height: 1.4;
  color: ${p => darken(0.2, p.theme.color.text)};
`;

const renderers = {
  image: (props: any) => (
    <>
      <MarkdownImage alt={props.alt} src={props.src}/>
      <MarkdownImageDescription>{props.title}</MarkdownImageDescription>
    </>
  ),
  text: (props: any) => (
    <MarkdownParagraph>{props.children}</MarkdownParagraph>
  )
}

export default (props: any) => {
  return <Markdown {...props} renderers={renderers}></Markdown>  
}