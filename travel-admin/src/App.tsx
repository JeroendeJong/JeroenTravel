// in app.js
import React from 'react';
import { Admin, Resource, Layout } from 'react-admin';
import {TripList, TripEdit, TripCreate, Tripshow} from './resources/trip';
import {TripSegmentList, TripSegmentCreate} from './resources/trip-segment';
import Provider from './data-provider/main';

import AppTopBar from './app-top-bar';

const Menu = () => <div/>
const CustomSidebar = (props: any) => null

const Layout2 = (props: any) => (
  <Layout
    {...props}
    appBar={AppTopBar}
    sidebar={CustomSidebar}
    menu={Menu}
  />
);

const AdminPortal = () => {
  return (
    <Admin dataProvider={Provider} layout={Layout2}>
      <Resource name="trip" list={TripList} edit={TripEdit} create={TripCreate} show={Tripshow} icon={null}/>
      <Resource name="trip-segment" list={TripSegmentList} edit={null} create={TripSegmentCreate} icon={null}/>
    </Admin>
  )
}

export default AdminPortal;