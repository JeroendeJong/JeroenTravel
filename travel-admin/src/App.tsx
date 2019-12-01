// in app.js
import React from 'react';
import { Admin, Resource } from 'react-admin';
import TravelDataProvider from './data-provider/tavel-singleton';
import {TripList, TripEdit, TripCreate, Tripshow} from './resources/trip';

const AdminPortal = () => {
  return (
    <Admin dataProvider={TravelDataProvider}>
      <Resource name="trip" list={TripList} edit={TripEdit} create={TripCreate} show={Tripshow} icon={null}/>
      <Resource name="trip segments" list={null} edit={null} create={null} icon={null}/>
    </Admin>
  )
}


export default AdminPortal;