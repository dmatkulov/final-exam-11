import React, { useCallback, useState } from 'react';
import {
  CircularProgress,
  List,
  ListItemButton,
  ListItemText,
  Stack,
} from '@mui/material';
import {
  fetchByCategory,
  fetchProducts,
} from '../../../features/products/productsThunks';
import {
  selectCategories,
  selectCategoriesLoading,
} from '../../../features/categories/categoriesSlice';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';

const NavBar: React.FC = () => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(selectCategories);
  const isLoading = useAppSelector(selectCategoriesLoading);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    'all',
  );

  const fetchAllItems = useCallback(async () => {
    await dispatch(fetchProducts());
    setSelectedCategory('all');
  }, [dispatch]);

  const fetchProductsByCategory = useCallback(
    (id: string) => {
      dispatch(fetchByCategory(id));
      setSelectedCategory(id);
    },
    [dispatch],
  );

  return (
    <>
      {isLoading && <CircularProgress />}
      <Stack direction="column">
        <List>
          <ListItemButton
            selected={selectedCategory === 'all'}
            onClick={fetchAllItems}
          >
            <ListItemText primary="All items" />
          </ListItemButton>
        </List>
        {categories.map((category) => (
          <ListItemButton
            selected={selectedCategory === category._id}
            key={category._id}
            onClick={() => fetchProductsByCategory(category._id)}
          >
            <ListItemText primary={category.title} />
          </ListItemButton>
        ))}
      </Stack>
    </>
  );
};

export default NavBar;
