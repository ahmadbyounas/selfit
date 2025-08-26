import React from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from '@mui/material';

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
      <DialogContent>
        <DialogContentText id="delete-dialog-description" sx={{ color: 'rgba(255,255,255,0.8)' }}>
          Are you sure you want to delete this {itemName}? This action cannot be undone.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={onClose}
          sx={{
            color: '#7c3aed',
            '&:hover': { bgcolor: 'rgba(124,58,237,0.1)' },
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={onConfirm}
          sx={{
            color: '#ef4444',
            '&:hover': { bgcolor: 'rgba(239,68,68,0.1)' },
          }}
          autoFocus
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteDialog;
