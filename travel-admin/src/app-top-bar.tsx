import React from 'react';
import { AppBar } from 'react-admin';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { toggleSidebar } from 'ra-core';

const useStyles = makeStyles({
  title: {
    flex: 1,
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
  },
  spacer: {
    flex: 1,
  },
});

const StubUserMenu = <div />;

const CustomAppBar = (props: any) => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const sideBarClicked: any = useSelector((state: any) => state.admin.ui.sidebarOpen);

  // little bit hacky, but ensures the hamburger menu returns home.
  if (sideBarClicked) {
    history.push('/');
    dispatch(toggleSidebar());
  }

  return (
    <AppBar {...props} userMenu={StubUserMenu}>
      <Typography
        variant="h6"
        color="inherit"
        className={classes.title}
        id="react-admin-title"
      />
    </AppBar>
  );
};

export default CustomAppBar;