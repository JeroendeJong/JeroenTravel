import React from 'react';
import { Create, AutocompleteArrayInput, SimpleForm, BooleanInput, TextInput, DateInput } from 'react-admin';
import CountryFlags from 'emoji-flags';
import { required } from 'ra-core';

const flagChoices = CountryFlags.data.map(flag => {
  flag.name = `${flag.emoji} - ${flag.name}`;
  return flag;
} );


const Title = () => <span>Create a Trip</span>

const TripCreate = (props: any) => (
  <Create title={<Title />} {...props}>
    <SimpleForm>
      <TextInput source="name" validate={required()}/>
      <BooleanInput source="active" validate={required()}/>
      <TextInput source="description" validate={required()}/>
      <TextInput source="header_image_url"/>
      <AutocompleteArrayInput source="country_codes" choices={flagChoices} optionText="name" optionValue="code" validate={required()}/>
    </SimpleForm>
  </Create>
);

export default TripCreate;