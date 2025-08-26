import React from 'react';
import { Box, Typography, Card } from '@mui/material';
import { BookOutlined } from '@mui/icons-material';

interface TotalBooksCardProps {
  count: number;
}

const TotalBooksCard: React.FC<TotalBooksCardProps> = ({ count }) => {
  return (
    <Card
      sx={{
        p: 3,
        bgcolor: 'rgba(255,255,255,0.08)',
        borderRadius: 3,
        border: '1px solid rgba(255,255,255,0.15)',
        backdropFilter: 'blur(8px)',
        textAlign: 'center',
        minWidth: 180,
        flexGrow: 1,
      }}
    >
      <BookOutlined sx={{ fontSize: 48, color: '#f59e0b', mb: 1 }} />
      <Typography variant="h5" fontWeight="bold" sx={{ color: 'white' }}>
        {count}
      </Typography>
      <Typography variant="body2" sx={{ opacity: 0.8, color: 'white' }}>
        Total Books
      </Typography>
    </Card>
  );
};

export default TotalBooksCard;
