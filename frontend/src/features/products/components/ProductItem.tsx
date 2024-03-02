import React from 'react';
import { Box, Button, Grid, Stack, Typography } from '@mui/material';
import { ProductInfo } from '../../../types';
import { apiURL } from '../../../helpers/constants';
import CategoryBadge from '../../../components/IU/Badge/CategoryBadge';
import { useAppSelector } from '../../../app/hooks';
import { selectUser } from '../../users/usersSlice';

interface Props {
  product: ProductInfo;
}

const ProductItem: React.FC<Props> = ({ product }) => {
  const cardImage = apiURL + '/' + product.image;
  const user = useAppSelector(selectUser);

  return (
    <>
      <Grid container spacing={4} maxWidth="md" mx="auto">
        <Grid item xs={4}>
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
        <Grid item xs={8}>
          <CategoryBadge title={product.category.title} />
          <Typography variant="h4" component="h1">
            {product.title}
          </Typography>
          <Typography variant="body1">{product.description}</Typography>
          <Stack>
            <Typography>Price: </Typography>
            <Typography>{product.price}</Typography>
          </Stack>
          <Typography>mobile: {product.user.phone}</Typography>
          {product.user._id === user?._id && <Button>Delete item</Button>}
        </Grid>
      </Grid>
    </>
  );
};

export default ProductItem;
