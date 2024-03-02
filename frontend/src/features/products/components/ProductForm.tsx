import React, { useState } from 'react';
import { Box, Grid, MenuItem, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { useNavigate } from 'react-router-dom';
import { createProduct } from '../productsThunks';
import { selectCategories } from '../../categories/categoriesSlice';
import { selectCreateError, selectCreateLoading } from '../productsSlice';
import FileInput from '../../../components/IU/FileInput/FileInput';
import { ProductMutation } from '../../../types';

const ProductForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const categories = useAppSelector(selectCategories);
  const error = useAppSelector(selectCreateError);
  const creating = useAppSelector(selectCreateLoading);

  const [state, setState] = useState<ProductMutation>({
    category: '',
    title: '',
    description: '',
    price: '',
    image: null,
  });

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setState((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const fileInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files) {
      setState((prevState) => ({
        ...prevState,
        [name]: files[0],
      }));
    }
  };

  const getFieldError = (fieldName: string) => {
    try {
      return error?.errors[fieldName].message;
    } catch {
      return undefined;
    }
  };

  const onSubmitPost = async (event: React.FormEvent) => {
    event.preventDefault();

    await dispatch(createProduct(state)).unwrap();
    navigate('/');
  };

  return (
    <>
      <Box component="form" onSubmit={onSubmitPost}>
        <Grid container item xs={8} direction="column" spacing={2} mx="auto">
          <Grid item xs>
            <TextField
              select
              fullWidth
              id="category"
              label="Category"
              value={state.category}
              onChange={inputChangeHandler}
              name={'category'}
              error={Boolean(getFieldError('category'))}
              helperText={getFieldError('category')}
            >
              <MenuItem value="" disabled>
                Please select a category
              </MenuItem>
              {categories.map((category) => (
                <MenuItem key={category._id} value={category._id}>
                  {category.title}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs>
            <TextField
              fullWidth
              label="Title"
              name="title"
              type="title"
              value={state.title}
              onChange={inputChangeHandler}
              error={Boolean(getFieldError('title'))}
              helperText={getFieldError('title')}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Description"
              name="description"
              type="description"
              multiline
              rows={4}
              value={state.description}
              onChange={inputChangeHandler}
              error={Boolean(getFieldError('description'))}
              helperText={getFieldError('description')}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Price"
              name="price"
              type="price"
              multiline
              rows={4}
              value={state.price}
              onChange={inputChangeHandler}
              error={Boolean(getFieldError('price'))}
              helperText={getFieldError('price')}
            />
          </Grid>
          <Grid item xs={6}>
            <FileInput
              getFieldError={getFieldError}
              onChange={fileInputChangeHandler}
            />
          </Grid>

          <Grid item xs={3} textAlign="center">
            <LoadingButton
              type="submit"
              loading={creating}
              disableElevation
              sx={{ mt: 3, mb: 2, py: 1 }}
              disabled={creating}
              variant="contained"
            >
              Create item
            </LoadingButton>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default ProductForm;
