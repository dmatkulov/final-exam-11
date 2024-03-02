import React, { useEffect } from 'react';
import { Container, Grid } from '@mui/material';
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
    dispatch(fetchCategories());
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <>
      <Container
        component="section"
        sx={{ display: 'flex', gap: 4 }}
        disableGutters
      >
        <Grid
          item
          xs={3}
          flexGrow={1}
          pr={2}
          pt="60px"
          sx={{ borderRight: '1px solid #ececec' }}
        >
          <NavBar />
        </Grid>
        <Grid
          container
          item
          xs={9}
          justifyContent="flex-start"
          spacing={2}
          pt="60px"
        >
          {isLoading && <LoadingPage />}
          {products.map((product) => (
            <Grid item xs={4} key={product._id}>
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default ProductsPage;
