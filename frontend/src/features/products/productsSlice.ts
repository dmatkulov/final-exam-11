import { Product } from '../../types';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { fetchByCategory, fetchProducts } from './productsThunks';

interface ProductsState {
  items: Product[];
  fetchLoading: boolean;
  createLoading: boolean;
}

const initialState: ProductsState = {
  items: [],
  fetchLoading: false,
  createLoading: false,
};

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.fetchLoading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, { payload: products }) => {
        state.fetchLoading = false;
        state.items = products;
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.fetchLoading = false;
      });

    builder
      .addCase(fetchByCategory.pending, (state) => {
        state.fetchLoading = true;
      })
      .addCase(fetchByCategory.fulfilled, (state, { payload: products }) => {
        state.fetchLoading = false;
        state.items = products;
      })
      .addCase(fetchByCategory.rejected, (state) => {
        state.fetchLoading = false;
      });
  },
});

export const productsReducer = productsSlice.reducer;
export const selectProducts = (state: RootState) => state.products.items;
export const selectProductsLoading = (state: RootState) =>
  state.products.fetchLoading;
export const selectCreateLoading = (state: RootState) =>
  state.products.createLoading;
