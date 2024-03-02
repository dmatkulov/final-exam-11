import React from 'react';
import CheckIcon from '@mui/icons-material/Check';
import { Alert } from '@mui/lab';
import { motion } from 'framer-motion';
import { Button, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';

interface Props {
  message: string;
}

const SuccessAlert: React.FC<Props> = ({ message }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{
        y: 100,
        opacity: 0,
      }}
      animate={{
        y: 0,
        opacity: 1,
      }}
    >
      <Grid item textAlign="center">
        <Alert
          icon={<CheckIcon fontSize="inherit" />}
          severity="success"
          sx={{ mt: 3, width: '100%', textAlign: 'center' }}
        >
          {message}
        </Alert>
      </Grid>
      <Button
        startIcon={<HomeIcon />}
        sx={{ textTransform: 'none' }}
        color={'info'}
        onClick={() => navigate('/')}
      >
        Home
      </Button>
    </motion.div>
  );
};

export default SuccessAlert;
