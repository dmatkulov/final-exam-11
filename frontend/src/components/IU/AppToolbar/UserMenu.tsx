import React, { useState } from 'react';
import {
  Button,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { User } from '../../../types';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { logOutUser } from '../../../features/users/usersThunks';
import { selectLogOutLoading } from '../../../features/users/usersSlice';
import LoadingPage from '../LoadingPage/LoadingPage';

interface Props {
  user: User;
}

const UserMenu: React.FC<Props> = ({ user }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const logOutLoading = useAppSelector(selectLogOutLoading);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => setAnchorEl(null);

  const logOut = () => {
    dispatch(logOutUser());
    navigate('/');
  };

  return (
    <>
      {logOutLoading && <LoadingPage />}
      <Stack
        sx={{ flexGrow: 1 }}
        direction="row"
        spacing={5}
        alignItems="flex-end"
        justifyContent="flex-end"
      >
        <Button
          variant="text"
          startIcon={<AddCircleIcon />}
          disableElevation
          onClick={() => navigate('/products/new-product')}
        >
          Sell items
        </Button>
        <Stack direction="row" alignItems="center">
          <Typography color="black">{user.username}</Typography>
          <IconButton
            color="primary"
            onClick={handleClick}
            sx={{ display: 'flex', gap: 1 }}
            disableRipple
          >
            <AccountCircleIcon color="secondary" />
          </IconButton>
        </Stack>
      </Stack>

      <Menu
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        keepMounted
        sx={{ mt: 2 }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem onClick={logOut}>
          <LogoutIcon sx={{ mr: 2 }} />
          Log out
        </MenuItem>
      </Menu>
    </>
  );
};

export default UserMenu;
