import React, { useCallback } from 'react';
import { Button, CircularProgress } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import {
  fetchByCategory,
  fetchProducts,
} from '../../../features/products/productsThunks';
import {
  selectCategories,
  selectCategoriesLoading,
} from '../../../features/categories/categoriesSlice';

const NavBar: React.FC = () => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(selectCategories);
  const isLoading = useAppSelector(selectCategoriesLoading);

  const fetchAllItems = useCallback(async () => {
    await dispatch(fetchProducts());
  }, []);

  const fetchProductsByCategory = useCallback((id: string) => {
    dispatch(fetchByCategory(id));
  }, []);

  return (
    <>
      {isLoading && <CircularProgress />}
      <Button variant="text" onClick={fetchAllItems}>
        All items
      </Button>
      {categories.map((category) => (
        <Button
          variant="text"
          key={category._id}
          onClick={() => fetchProductsByCategory(category._id)}
        >
          {category.title}
        </Button>
      ))}
    </>
  );
};

export default NavBar;
