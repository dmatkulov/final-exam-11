import { createAsyncThunk } from '@reduxjs/toolkit';
import { Product, ProductInfo } from '../../types';
import axiosApi from '../../axiosApi';
import { routes } from '../../helpers/constants';

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
    console.log(response.data);

    return response.data ?? null;
  },
);
