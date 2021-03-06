import React from "react";
import { Edit, AutocompleteArrayInput, SimpleForm, BooleanInput, TextInput, DateInput } from 'react-admin';
import CountryFlags from 'emoji-flags';
import Title from "../../utils/title";

const flagChoices = CountryFlags.data.map(flag => {
  flag.name = `${flag.emoji} - ${flag.name}`;
  return flag;
} );

const TripEdit = (props: any) => (
  <Edit title={<Title />} {...props}>
    <SimpleForm>
      <TextInput disabled source="id" />
      <TextInput source="name" />
      <BooleanInput source="active" />
      <TextInput source="description"/>
      <DateInput source="start_date" />
      <DateInput source="end_date" />
      <TextInput source="header_image_url"/>
      <AutocompleteArrayInput source="country_codes" choices={flagChoices} optionText="name" optionValue="code" />
    </SimpleForm>
  </Edit>
);

export default TripEdit;