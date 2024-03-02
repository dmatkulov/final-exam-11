import React from 'react';
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Divider,
  Grid,
  Typography,
} from '@mui/material';
import { Product } from '../../../types';
import { apiURL } from '../../../helpers/constants';
import { useNavigate } from 'react-router-dom';

interface Props {
  product: Product;
}

const ProductCard: React.FC<Props> = ({ product }) => {
  const navigate = useNavigate();
  const cardImage = apiURL + '/' + product.image;

  return (
    <>
      <Card
        onClick={() => navigate('/products/' + product._id)}
        elevation={0}
        sx={{
          borderRadius: '12px',
          padding: 1.5,
          boxShadow: 0,
          borderColor: '#ececec',
          cursor: 'pointer',
        }}
      >
        <CardMedia
          image={cardImage}
          sx={{
            borderRadius: '6px',
            width: '100%',
            height: '200px',
            backgroundColor: 'rgba(0,0,0,0.8)',
          }}
        />
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Box>
            <Typography gutterBottom variant="h6">
              {product.title}
            </Typography>
            <Divider />
            <Grid
              container
              justifyContent="space-between"
              alignItems="center"
              mt={2}
            >
              <Typography
                display="block"
                variant="subtitle2"
                color="text.secondary"
              >
                {product.price}
              </Typography>
            </Grid>
          </Box>
        </CardContent>
      </Card>
    </>
  );
};

export default ProductCard;
