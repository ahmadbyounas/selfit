import React from 'react';
import { Box, Typography } from '@mui/material';
import { BookOutlined } from '@mui/icons-material'; // Using a simple icon for now

interface EmptyStateProps {
  message: string;
  animation?: React.ReactNode; // Optional: for more complex animations like Lottie
}

const EmptyState: React.FC<EmptyStateProps> = ({ message, animation }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        p: 4,
        textAlign: 'center',
        color: 'rgba(255,255,255,0.7)',
        minHeight: '200px',
        borderRadius: '12px',
        border: '1px dashed rgba(255,255,255,0.3)',
        mt: 4,
        bgcolor: 'rgba(255,255,255,0.05)',
        backdropFilter: 'blur(5px)',
      }}
    >
      {animation || <BookOutlined sx={{ fontSize: 80, mb: 2, color: 'rgba(255,255,255,0.5)' }} />}
      <Typography variant="h6" sx={{ mb: 1 }}>
        {message}
      </Typography>
      <Typography variant="body2" sx={{ opacity: 0.8 }}>
        Start by adding your first book!
      </Typography>
    </Box>
  );
};

export default EmptyState;
