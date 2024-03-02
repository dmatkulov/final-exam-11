import { Product, ProductInfo } from '../../types';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import {
  fetchByCategory,
  fetchOneProduct,
  fetchProducts,
} from './productsThunks';

interface ProductsState {
  items: Product[];
  item: ProductInfo | null;
  fetchLoading: boolean;
  fetchOneLoading: boolean;
  createLoading: boolean;
}

const initialState: ProductsState = {
  items: [],
  item: null,
  fetchLoading: false,
  fetchOneLoading: false,
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

    builder
      .addCase(fetchOneProduct.pending, (state) => {
        state.fetchOneLoading = true;
      })
      .addCase(fetchOneProduct.fulfilled, (state, { payload: product }) => {
        state.fetchOneLoading = false;
        state.item = product;
      })
      .addCase(fetchOneProduct.rejected, (state) => {
        state.fetchOneLoading = false;
      });
  },
});

export const productsReducer = productsSlice.reducer;
export const selectProducts = (state: RootState) => state.products.items;
export const selectOneProduct = (state: RootState) => state.products.item;
export const selectProductsLoading = (state: RootState) =>
  state.products.fetchLoading;
export const selectOneLoading = (state: RootState) =>
  state.products.fetchOneLoading;
export const selectCreateLoading = (state: RootState) =>
  state.products.createLoading;
