import React from "react";
import { Edit, AutocompleteArrayInput, SimpleForm, BooleanInput, TextInput, DateInput } from 'react-admin';
import MarkdownInput from './markdown-editor';
import Title from "../../utils/title";
import { required } from 'ra-core';
import { parse } from 'query-string';

const TripSegmentEdit = (props: any) => {
  const { trip_id: tripIdString } = parse(props.location.search);
  const trip_id = tripIdString ? parseInt((tripIdString as string), 10) : '';

  console.log(trip_id);

  return (
    <Edit title={<Title />} {...props}>
      <SimpleForm defaultValue={{ trip_id }}>
        <TextInput style={{width: '100%'}} source="name" validate={required()}/>

        <TextInput style={{width: '100%'}}  source="location_type" validate={required()}/>
        <TextInput style={{width: '100%'}}  source="location_text" validate={required()}/>

        <TextInput style={{width: '100%'}}  source="short_description" validate={required()}/>
        <MarkdownInput source="long_description" validate={required()}/>

        <DateInput style={{width: '100%'}}  source="arrival_time" validate={required()}/>
        <DateInput style={{width: '100%'}}  source="departure_time" validate={required()}/>

      </SimpleForm>
    </Edit>
  )
  };

export default TripSegmentEdit;