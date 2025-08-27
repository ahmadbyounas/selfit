import React from 'react';
import { Box, Typography } from '@mui/material';
// import { BookOutlined } from '@mui/icons-material'; // No longer needed
import { DotLottieReact } from '@lottiefiles/dotlottie-react'; // New import

interface EmptyStateProps {
  message: string;
  // animation?: React.ReactNode; // No longer needed as we're using a specific Lottie
}

const EmptyState: React.FC<EmptyStateProps> = ({ message }) => { // Removed animation prop
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
      <DotLottieReact
        src="https://lottie.host/96765ff8-8263-4e51-aa03-7b6861cd056b/QQZzLS6FVJ.lottie"
        loop
        autoplay
        style={{ width: '150px', height: '150px', marginBottom: '16px' }} // Adjust size as needed
      />
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