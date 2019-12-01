import React from 'react';
import { List, Datagrid, Create, AutocompleteArrayInput, SimpleForm, DateField, BooleanInput, EditButton, TextInput, DateInput } from 'react-admin';
import CountryFlags from 'emoji-flags';

const Title = ({record}: any) => {
  return <span>{record.name}</span>;
};


const flagChoices = CountryFlags.data.map(flag => {
  flag.name = `${flag.emoji} - ${flag.name}`;
  return flag;
} );


const TripCreate = (props: any) => (
  <Create title={<Title />} {...props}>
    <SimpleForm>
      <TextInput source="name" />
      <BooleanInput source="active" />
      <TextInput source="description"/>
      <DateInput source="start_date" />
      <DateInput source="end_date" />
      <TextInput source="header_image_url"/>
      <AutocompleteArrayInput source="country_codes" choices={flagChoices} optionText="name" optionValue="code" />
    </SimpleForm>
  </Create>
);

export default TripCreate;