import React from 'react';
import styled from 'styled-components';
import TravelImage from './image-view';
import Markdown from 'react-markdown';
import { readableTravelColor } from './common';

const MarkdownImage = styled(TravelImage)`
  width: calc(100% - 10px - 10px);
  height: 300px;
  object-fit: cover;

  padding-left: 10px;
  padding-right: 10px;
`;

const MarkdownImageDescription = styled.span`
  margin: 0;
  display: block;
  font-size: 12px;

  padding-left: 10px;
  padding-right: 10px;
`;

const MarkdownParagraph = styled.span`
  display: block;
  margin-left: 10px;
  margin-right: 10px;
  font-size: 14px;
  line-height: 1.4;
  color: ${p => readableTravelColor(p.theme.color.secondary)};

  padding-left: 20px;
  padding-right: 20px;
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