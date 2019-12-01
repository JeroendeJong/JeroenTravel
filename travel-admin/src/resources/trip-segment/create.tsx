import React from 'react';
import { Create, SimpleForm, BooleanInput, TextInput, DateInput } from 'react-admin';
import MarkdownInput from 'ra-input-markdown';
import Title from '../../utils/title';
import { required } from 'ra-core';
import { parse } from 'query-string';

const TripSegmentCreate = (props: any) => {
  const { trip_id: tripIdString } = parse(props.location.search);
  const trip_id = tripIdString ? parseInt((tripIdString as string), 10) : '';

  return (
    <Create title={<Title />} {...props}>
      <SimpleForm defaultValue={{ trip_id }}>
        <TextInput source="name" validate={required()}/>

        <TextInput source="location_type" validate={required()}/>
        <TextInput source="location_text" validate={required()}/>

        <TextInput source="short_description" validate={required()}/>
        <MarkdownInput source="long_description" validate={required()}/>

        <DateInput source="arrival_time" validate={required()}/>
        <DateInput source="departure_time" validate={required()}/>

      </SimpleForm>
    </Create>
  )
};

export default TripSegmentCreate;