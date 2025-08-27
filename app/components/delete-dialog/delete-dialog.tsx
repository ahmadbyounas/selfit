import React from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
 } from '@mui/material';
import { WarningAmber as WarningAmberIcon } from '@mui/icons-material';
import { motion } from 'framer-motion';

interface DeleteDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  itemName?: string;
}

const DeleteDialog: React.FC<DeleteDialogProps> = ({
  open,
  onClose,
  onConfirm,
  itemName = 'item',
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.2 }}
    >
      <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="delete-dialog-title"
        aria-describedby="delete-dialog-description"
        sx={{
          '& .MuiPaper-root': {
            bgcolor: '#1e1b4b', // Dark background
            color: 'white',
            borderRadius: '12px',
            border: '1px solid rgba(255,255,255,0.1)',
            boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
            backdropFilter: 'blur(4px)',
            WebkitBackdropFilter: 'blur(4px)',
          },
        }}
      >
        <DialogTitle id="delete-dialog-title" sx={{ color: '#f59e0b' }}>
          Confirm Deletion
        </DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', pt: 2 }}>
          <WarningAmberIcon sx={{ fontSize: 60, color: '#f59e0b', mb: 2 }} />
          <DialogContentText id="delete-dialog-description" sx={{ color: 'rgba(255,255,255,0.8)', textAlign: 'center' }}>
            Are you sure you want to delete this {itemName}? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center', pb: 3 }}>
          <Button
            onClick={onClose}
            variant="outlined"
            sx={{
              color: 'white',
              borderColor: 'rgba(255,255,255,0.3)',
              '&:hover': { borderColor: '#7c3aed', bgcolor: 'rgba(124,58,237,0.1)' },
              px: 3,
              py: 1,
              borderRadius: '8px',
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={onConfirm}
            variant="contained"
            sx={{
              bgcolor: '#ef4444',
              '&:hover': { bgcolor: '#dc2626' },
              px: 3,
              py: 1,
              borderRadius: '8px',
              fontWeight: 'bold',
            }}
            autoFocus
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </motion.div>
  );
};

export default DeleteDialog;
