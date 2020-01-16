import React from 'react';
import { Create, SimpleForm, TextInput, DateInput } from 'react-admin';
import MarkdownInput from './markdown-editor';
import { required } from 'ra-core';
import { parse } from 'query-string';

const Title = (props: any) => {
  console.log(props);
  return <span>New Segment for {props.tripId}</span>;
};



const TripSegmentCreate = (props: any) => {
  const { trip_id: tripIdString } = parse(props.location.search);
  const trip_id = tripIdString ? parseInt((tripIdString as string), 10) : '';

  return (
    <Create title={<Title tripId={trip_id} />} {...props}>
      <SimpleForm defaultValue={{ trip_id }}>
        <TextInput style={{width: '100%'}} source="name" validate={required()}/>

        <TextInput style={{width: '100%'}}  source="location_type" validate={required()}/>
        <TextInput style={{width: '100%'}}  source="location_text" validate={required()}/>

        <TextInput style={{width: '100%'}}  source="short_description" validate={required()}/>
        <MarkdownInput source="long_description" validate={required()}/>

        <DateInput style={{width: '100%'}}  source="arrival_time" validate={required()}/>
        <DateInput style={{width: '100%'}}  source="departure_time" validate={required()}/>

      </SimpleForm>
    </Create>
  )
};

export default TripSegmentCreate;