import { Product, ProductInfo, ValidationError } from '../../types';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import {
  createProduct,
  deleteProduct,
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
  createError: ValidationError | null;
  deleteLoading: boolean;
}

const initialState: ProductsState = {
  items: [],
  item: null,
  fetchLoading: false,
  fetchOneLoading: false,
  createLoading: false,
  createError: null,
  deleteLoading: false,
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

    builder
      .addCase(deleteProduct.pending, (state) => {
        state.deleteLoading = true;
      })
      .addCase(deleteProduct.fulfilled, (state) => {
        state.deleteLoading = false;
      })
      .addCase(deleteProduct.rejected, (state) => {
        state.deleteLoading = false;
      });

    builder
      .addCase(createProduct.pending, (state) => {
        state.createLoading = true;
        state.createError = null;
      })
      .addCase(createProduct.fulfilled, (state) => {
        state.createLoading = false;
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.createLoading = false;
        state.createError = action.payload || null;
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

export const selectCreateError = (state: RootState) =>
  state.products.createError;

export const selectDeleteLoading = (state: RootState) =>
  state.products.deleteLoading;
