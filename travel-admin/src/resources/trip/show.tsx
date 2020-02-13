import React from 'react';
import { DeleteButton, Button, BooleanField, RichTextField, Show, EditButton, Tab, TabbedShowLayout, TextField, ReferenceManyField, Datagrid, CreateButton } from 'react-admin';
import ArrayTextField from '../../utils/array-text-field';
import Title from '../../utils/title';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles({
  button: {
    width: '100%'
  },
});


const CreateSegmentButton = ({ record }: any) => {
  return (
    <Button
      variant="text"
      component={Link}
      to={`/trip-segment/create?trip_id=${record.id}`}
      label="Add Segment"
      title="Add Segment"
    >
      <AddIcon/>
    </Button>
  )
};

const TripShow = (props: any) => {
  const classes = useStyles(props.classes);

  return (
    <Show {...props} classes={classes} title={<Title />}>
      <TabbedShowLayout>
        <Tab label="Base Details">
          <ArrayTextField label="Countries" source="country_codes" />
          <TextField source="id" />
          <TextField source="name" />
          <RichTextField source="description"/>
          <BooleanField source="active"/>
        </Tab>
        <Tab label="Segments" path="segments">
          <CreateSegmentButton/>
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
  )
};
    
export default TripShow;