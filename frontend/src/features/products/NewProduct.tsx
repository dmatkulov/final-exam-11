import React from 'react';
import { Grid, Typography } from '@mui/material';
import ProductForm from './components/ProductForm';
import { useAppSelector } from '../../app/hooks';
import { selectUser } from '../users/usersSlice';
import { Navigate } from 'react-router-dom';

const NewProduct: React.FC = () => {
  const user = useAppSelector(selectUser);

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <Grid container direction="column" mt="60px">
      <Typography variant="h4" component="h1" textAlign="center" mb={6}>
        Create new item
      </Typography>
      <ProductForm />
    </Grid>
  );
};

export default NewProduct;
