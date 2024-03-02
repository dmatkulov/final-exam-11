import React from 'react';
import CheckIcon from '@mui/icons-material/Check';
import { Alert } from '@mui/lab';
import { motion } from 'framer-motion';
import { Grid } from '@mui/material';

interface Props {
  message: string;
}

const SuccessAlert: React.FC<Props> = ({ message }) => {
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
    </motion.div>
  );
};

export default SuccessAlert;
