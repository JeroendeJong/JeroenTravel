// in app.js
import React from 'react';
import { Admin, Resource } from 'react-admin';
import {TripList, TripEdit, TripCreate, Tripshow} from './resources/trip';
import {TripSegmentList} from './resources/trip-segment';
import Provider from './data-provider/main';




const AdminPortal = () => {
  return (
    <Admin dataProvider={Provider}>
      <Resource name="trip" list={TripList} edit={TripEdit} create={TripCreate} show={Tripshow} icon={null}/>
      <Resource name="trip-segment" list={null} edit={null} create={null} icon={null}/>
    </Admin>
  )
}


export default AdminPortal;