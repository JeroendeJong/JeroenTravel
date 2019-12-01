import React from 'react';
import { BooleanField, RichTextField, Show, EditButton, Tab, TabbedShowLayout, TextField, ReferenceManyField, Datagrid, CreateButton } from 'react-admin';
import ArrayTextField from '../../utils/array-text-field';
import Title from '../../utils/title';

const PostShow = (props: any) => (
  <Show {...props} title={<Title />}>
    <TabbedShowLayout>
      <Tab label="Base Details">
        <ArrayTextField label="Countries" source="country_codes" />
        <TextField source="id" />
        <TextField source="name" />
        <RichTextField source="description"/>
        <BooleanField source="active"/>
      </Tab>
      <Tab label="Segments" path="segments">
        <ReferenceManyField reference="trip-segment" target="id">
          <Datagrid>
            <TextField source="name" />

            <TextField source="location_type" />
            <TextField source="location_text" />

            <TextField label="Accomodation" source="accomodation.name"/>
            <EditButton />
          </Datagrid>
        </ReferenceManyField>
      </Tab>
    </TabbedShowLayout>
  </Show>
);
    
export default PostShow;