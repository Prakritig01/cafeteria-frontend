import React, { useState, useEffect } from 'react';
import {
  Modal,
  Box,
  TextField,
  Button,
  CircularProgress,
  Typography,
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { selectLoading, setCounter, setLoading, updateCounter } from '@/slices/counterSlice';
import axios from 'axios';
import { BASE_URL } from '@/utils/apiConfig';
import { setMerchantCounters, updateMerchantCounters } from '@/slices/authSlice';

const EditCounterModal = ({ counter, open, onClose, onSave }) => {
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);
  

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image: '',
  });

  // Update form data when counter changes
  useEffect(() => {
    if (counter) {
      setFormData({
        name: counter.name || '',
        description: counter.description || '',
        image: counter.image || '',
      });
    }
  }, [counter]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(setLoading(true)); // Set loading state

    try {
      const response = await axios.patch(`${BASE_URL}/counter/${counter._id}`, formData);
      if (response.status === 200) {
        // Optimistic UI update - immediately update the counter in the store
        dispatch(updateCounter(response.data.counter));
        // dispatch(setMerchantCounters({...counter,response.data.counter}));
        dispatch(updateMerchantCounters(response.data.counter));
        onClose(); // Close modal after saving
      }
    } catch (error) {
      console.error('Error updating counter:', error);
    } finally {
      dispatch(setLoading(false)); // Reset loading state
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" gutterBottom>
          Edit Counter
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Counter Name"
            fullWidth
            margin="normal"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <TextField
            label="Description"
            fullWidth
            margin="normal"
            multiline
            rows={3}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
          <TextField
            label="Image URL"
            fullWidth
            margin="normal"
            value={formData.image}
            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
          />
          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
            <Button onClick={onClose} disabled={loading}>
              Cancel
            </Button>
            <Button type="submit" variant="contained" disabled={loading}>
              {loading ? <CircularProgress size={24} /> : 'Save'}
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

export default EditCounterModal;
