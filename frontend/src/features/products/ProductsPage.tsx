import React, { useEffect } from 'react';
import { Grid } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchCategories } from '../categories/categoriesThunks';
import NavBar from '../../components/IU/NavBar/NavBar';
import ProductCard from './components/ProductCard';
import { selectProducts, selectProductsLoading } from './productsSlice';
import LoadingPage from '../../components/IU/LoadingPage/LoadingPage';
import { fetchProducts } from './productsThunks';

const ProductsPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector(selectProducts);
  const isLoading = useAppSelector(selectProductsLoading);

  useEffect(() => {
    dispatch(fetchCategories()).unwrap();
    dispatch(fetchProducts()).unwrap();
  }, [dispatch]);

  return (
    <div>
      <Grid container>
        <Grid item xs={3}>
          <NavBar />
        </Grid>
        <Grid item xs={0}>
          Products here!!!!
          {isLoading && <LoadingPage />}
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </Grid>
      </Grid>
    </div>
  );
};

export default ProductsPage;
