import React, { useCallback, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectOneLoading, selectOneProduct } from './productsSlice';
import { useParams } from 'react-router-dom';
import { fetchOneProduct } from './productsThunks';
import LoadingPage from '../../components/IU/LoadingPage/LoadingPage';
import ProductItem from './components/ProductItem';

const ProductInfo: React.FC = () => {
  const { id } = useParams() as { id: string };

  const dispatch = useAppDispatch();
  const product = useAppSelector(selectOneProduct);
  const isLoading = useAppSelector(selectOneLoading);

  const fetchProduct = useCallback(async () => {
    await dispatch(fetchOneProduct(id)).unwrap();
  }, []);

  useEffect(() => {
    void fetchProduct();
  }, [dispatch]);

  return (
    <>
      {isLoading && <LoadingPage />}
      {product && <ProductItem product={product} />}
    </>
  );
};

export default ProductInfo;
