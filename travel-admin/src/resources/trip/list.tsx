import React from "react";
import { List, Datagrid, TextField, BooleanField, EditButton, ShowButton, CreateButton } from 'react-admin';
import Toolbar from '@material-ui/core/Toolbar';
import ArrayTextField from "../../utils/array-text-field";

const PostActions = (props: any) => (
  <Toolbar>
      <CreateButton basePath={props.basePath} />
  </Toolbar>
);

const TripList = (props: any) => (
  <List {...props} actions={<PostActions />}>
    <Datagrid>
      <TextField source="id" />
      <TextField source="name" />
      <ArrayTextField label="Countries" source="country_codes" />
      <BooleanField source="active" />
      <EditButton basePath="/trip" />
      <ShowButton basePath="/trip" />
    </Datagrid>
  </List>
);


export default TripList