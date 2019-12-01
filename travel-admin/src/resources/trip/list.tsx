import React from "react";
import { List, Datagrid, TextField, BooleanField, EditButton, DeleteButton, CreateButton } from 'react-admin';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';

// const useStyles = makeStyles({
//   toolbar: {
//     display: 'flex',
//     justifyContent: 'space-between',
//   },
// });

const CustomToolbar = (props: any) => (
  <Toolbar>
    <CreateButton basePath={props.basePath} />
    <DeleteButton undoable={false} />
  </Toolbar>
);

const PostActions = (props: any) => (
  <Toolbar>
      <CreateButton basePath={props.basePath} />
  </Toolbar>
);



const TripList = (props: any) => (
  <List {...props} actions={<PostActions />} toolbar={<CustomToolbar/>}>
    <Datagrid toolbar={<CustomToolbar/>}>
      <TextField source="id" />
      <TextField source="name" />
      <TextField source="country_codes" />
      <BooleanField source="active" />
      <EditButton basePath="/trip" />
    </Datagrid>
  </List>
);


export default TripList