import React from 'react';
import { NavLink } from 'react-router-dom';
import { AppBar, Grid, styled, Toolbar, Typography } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import { useAppSelector } from '../../../app/hooks';
import { selectUser } from '../../../features/users/usersSlice';

import UserMenu from './UserMenu';
import GuestMenu from './GuestMenu';

const Link = styled(NavLink)({
  color: 'inherit',
  textDecoration: 'none',
  '&:hover': {
    color: 'inherit',
  },
});
const AppToolbar: React.FC = () => {
  const user = useAppSelector(selectUser);

  return (
    <AppBar
      position="sticky"
      sx={{
        backgroundColor: 'white',
        boxShadow: 0,
        mb: '80px',
      }}
    >
      <Toolbar disableGutters>
        <Grid
          container
          justifyContent="space-between"
          alignItems="center"
          sx={{
            borderBottom: '1px solid #eee',
            py: 2,
            px: 3,
          }}
        >
          <Typography variant="h6" component="div" color="black">
            <Link to="/" sx={{ display: 'flex', gap: 1 }}>
              <ShoppingCartIcon color="primary" />
              <Typography variant="subtitle1">Flea Market</Typography>
            </Link>
          </Typography>
          {user ? <UserMenu user={user} /> : <GuestMenu />}
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default AppToolbar;
