import { createAsyncThunk } from '@reduxjs/toolkit';
import { Category } from '../../types';
import axiosApi from '../../axiosApi';
import { routes } from '../../helpers/constants';

export const fetchCategories = createAsyncThunk<Category[]>(
  'categories/fetchAll',
  async () => {
    const response = await axiosApi.get<Category[]>(routes.categories);
    return response.data ?? [];
  },
);
