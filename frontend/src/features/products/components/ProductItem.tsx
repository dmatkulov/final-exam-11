import React, { useCallback } from 'react';
import { Box, Divider, Grid, Typography } from '@mui/material';
import { ProductInfo } from '../../../types';
import { apiURL } from '../../../helpers/constants';
import CategoryBadge from '../../../components/IU/Badge/CategoryBadge';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectUser } from '../../users/usersSlice';
import { selectDeleteLoading } from '../productsSlice';
import { deleteProduct } from '../productsThunks';
import { LoadingButton } from '@mui/lab';
import { useNavigate } from 'react-router-dom';

interface Props {
  product: ProductInfo;
}

const ProductItem: React.FC<Props> = ({ product }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector(selectUser);
  const deleting = useAppSelector(selectDeleteLoading);
  const cardImage = apiURL + '/' + product.image;

  const onDeleteProduct = useCallback(async () => {
    await dispatch(deleteProduct(product._id)).unwrap();
    navigate('/');
  }, [dispatch, navigate, product._id]);

  return (
    <>
      <Grid container spacing={4} mx="auto" mt="60px">
        <Grid item xs={6}>
          <Box
            sx={{ height: '450px', overflow: 'hidden', borderRadius: '12px' }}
          >
            <img
              src={cardImage}
              alt={product.title}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          </Box>
        </Grid>
        <Grid item xs={6}>
          <CategoryBadge title={product.category.title} />
          <Typography variant="h4" component="h1" mt={3} mb={6}>
            {product.title}
          </Typography>
          <Box>
            <Typography variant="subtitle1" mb={1} fontWeight="bold">
              Description
            </Typography>
            <Typography variant="body1" mb={3}>
              {product.description}
            </Typography>
            <Divider />
          </Box>
          <Box
            mt={4}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <Box mb={6}>
              <Typography variant="subtitle1">
                Price:
                {product.price} KGS
              </Typography>
              <Typography variant="subtitle1">
                Mobile:
                {product.user.phone}
              </Typography>
            </Box>
            <Box>
              {product.user._id === user?._id && (
                <LoadingButton
                  variant="contained"
                  color="error"
                  onClick={onDeleteProduct}
                  loading={deleting}
                  disabled={deleting}
                  disableElevation
                >
                  Delete item
                </LoadingButton>
              )}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default ProductItem;
