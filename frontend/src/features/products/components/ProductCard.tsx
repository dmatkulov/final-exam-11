import React from 'react';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';
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
          border: '1px solid #eeeeee',
          padding: 1.5,
          boxShadow: 0,
          borderColor: '#ececec',
          height: '100%',
          maxWidth: 345,
          '&:hover': {
            backgroundColor: '#F1F1F1',
            cursor: 'pointer',
          },
          display: 'flex',
          flexDirection: 'column',
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
        <CardContent
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            flexGrow: 1,
          }}
        >
          <Typography gutterBottom variant="h6" mb={2}>
            {product.title}
          </Typography>
          <Typography
            display="block"
            variant="subtitle2"
            mt="auto"
            color="white"
            px={2}
            sx={{
              bgcolor: '#ff5722',
              borderRadius: 3,
            }}
          >
            Price: {product.price} KGS
          </Typography>
        </CardContent>
      </Card>
    </>
  );
};

export default ProductCard;
