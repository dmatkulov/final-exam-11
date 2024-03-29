import React, { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Avatar,
  Box,
  Container,
  Grid,
  Link,
  TextField,
  Typography,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  resetMessages,
  selectRegisterError,
  selectRegisterLoading,
  selectRegisterMessage,
} from './usersSlice';
import { RegisterMutation } from '../../types';
import { registerUser } from './usersThunks';
import { LoadingButton } from '@mui/lab';
import SuccessAlert from '../../components/IU/Alerts/SuccessAlert';

const RegisterUser: React.FC = () => {
  const dispatch = useAppDispatch();

  const registerMessage = useAppSelector(selectRegisterMessage);
  const error = useAppSelector(selectRegisterError);
  const loading = useAppSelector(selectRegisterLoading);

  const [state, setState] = useState<RegisterMutation>({
    username: '',
    password: '',
    displayName: '',
    phone: '',
  });

  useEffect(() => {
    dispatch(resetMessages());
  }, [dispatch]);

  const getFieldError = (fieldName: string) => {
    try {
      return error?.errors[fieldName].message;
    } catch {
      return undefined;
    }
  };

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setState((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const submitFormHandler = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      await dispatch(registerUser(state)).unwrap();
    } catch (e) {
      console.error(e);
    }
  };

  let formField: React.ReactNode;

  if (registerMessage) {
    formField = (
      <Grid container justifyContent="center" direction="column" gap={2}>
        <SuccessAlert message={registerMessage} />
      </Grid>
    );
  } else {
    formField = (
      <Box component="form" onSubmit={submitFormHandler} sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Username"
              name="username"
              type="text"
              value={state.username}
              autoComplete="new-username"
              fullWidth
              onChange={inputChangeHandler}
              error={Boolean(getFieldError('username'))}
              helperText={getFieldError('username')}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="password"
              label="Password"
              type="password"
              value={state.password}
              autoComplete="new-password"
              fullWidth
              onChange={inputChangeHandler}
              error={Boolean(getFieldError('password'))}
              helperText={getFieldError('password')}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="displayName"
              label="Display name"
              type="text"
              value={state.displayName}
              autoComplete="new-displayName"
              fullWidth
              onChange={inputChangeHandler}
              error={Boolean(getFieldError('displayName'))}
              helperText={getFieldError('displayName')}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="phone"
              label="Phone number"
              type="tel"
              value={state.phone}
              autoComplete="new-phone"
              fullWidth
              onChange={inputChangeHandler}
              error={Boolean(getFieldError('phone'))}
              helperText={getFieldError('phone')}
            />
          </Grid>
        </Grid>
        <Grid item xs={12} textAlign="center">
          <LoadingButton
            type="submit"
            loading={loading}
            color={'info'}
            disableElevation
            sx={{ mt: 3, mb: 2, py: 1 }}
            disabled={loading}
            variant="contained"
          >
            Sign Up
          </LoadingButton>
        </Grid>
        <Grid container justifyContent="center">
          <Grid item>
            <Link component={RouterLink} to="/login" variant="body2">
              Already have an account? Sign in
            </Link>
          </Grid>
        </Grid>
      </Box>
    );
  }

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'primary' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>

        {formField}
      </Box>
    </Container>
  );
};
export default RegisterUser;
