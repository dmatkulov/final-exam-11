import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  Product,
  ProductInfo,
  ProductMutation,
  ValidationError,
} from '../../types';
import axiosApi from '../../axiosApi';
import { routes } from '../../helpers/constants';
import { RootState } from '../../app/store';
import { isAxiosError } from 'axios';

export const fetchProducts = createAsyncThunk<Product[]>(
  'products/fetchAll',
  async () => {
    const response = await axiosApi.get<Product[]>(routes.products);
    return response.data ?? [];
  },
);

export const fetchByCategory = createAsyncThunk<Product[], string>(
  'products/fetchByCategory',
  async (category) => {
    const response = await axiosApi.get<Product[]>(
      routes.products + '?category=' + category,
    );

    return response.data ?? [];
  },
);

export const fetchOneProduct = createAsyncThunk<ProductInfo | null, string>(
  'products/fetchOne',
  async (id) => {
    const response = await axiosApi.get<ProductInfo | null>(
      routes.products + '/' + id,
    );
    return response.data ?? null;
  },
);

export const createProduct = createAsyncThunk<
  void,
  ProductMutation,
  { state: RootState; rejectValue: ValidationError }
>('products/createProduct', async (product, { getState, rejectWithValue }) => {
  try {
    const token = getState().users.user?.token;

    const formData = new FormData();

    formData.append('category', product.category);
    formData.append('title', product.title);
    formData.append('description', product.description);
    formData.append('price', product.price);

    if (product.image) {
      formData.append('image', product.image);
    }

    await axiosApi.post(routes.products, formData, {
      headers: { Authorization: 'Bearer ' + token },
    });
  } catch (e) {
    if (isAxiosError(e) && e.response && e.response.status === 422) {
      return rejectWithValue(e.response.data);
    }

    throw e;
  }
});

export const deleteProduct = createAsyncThunk<
  void,
  string,
  { state: RootState }
>('products/delete', async (id, { getState }) => {
  const token = getState().users.user?.token;
  await axiosApi.delete(routes.products + '/' + id, {
    headers: { Authorization: 'Bearer ' + token },
  });
});
