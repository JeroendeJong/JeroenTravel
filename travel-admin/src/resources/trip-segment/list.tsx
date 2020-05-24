import React from "react";
import { useHistory } from "react-router";

import CircularProgress from '@material-ui/core/CircularProgress'


const TripList = (props: any) => {
  const history = useHistory();
  history.push('/');
  return <CircularProgress/>;
}

export default TripList