import React from "react";
import { List, Datagrid, TextField, BooleanField, EditButton, DeleteButton, CreateButton } from 'react-admin';
import Toolbar from '@material-ui/core/Toolbar';

const PostActions = (props: any) => (
  <Toolbar>
      <CreateButton basePath={props.basePath} />
  </Toolbar>
);

const ArrayStringTextField = ({ source, record = {} }: any) => {
  const text = record[source].toString().replace(/,/gi, '');
  return <span>{text}</span>;
}

const TripList = (props: any) => (
  <List {...props} actions={<PostActions />}>
    <Datagrid>
      <TextField source="id" />
      <TextField source="name" />
      <ArrayStringTextField label="Countries" source="country_codes" />
      <BooleanField source="active" />
      <EditButton basePath="/trip" />
    </Datagrid>
  </List>
);


export default TripList