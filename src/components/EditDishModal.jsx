import React, { useState, useEffect } from "react";
import {
  Modal,
  Box,
  TextField,
  Button,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Switch,
  FormControlLabel,
  FormHelperText,
  CircularProgress
} from "@mui/material";
import axios from "axios";
import { BASE_URL } from "@/utils/apiConfig";
import { useDispatch } from "react-redux";
import { updateDish } from "@/slices/counterSlice";

const EditDishModal = ({ dish, onClose }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({ ...dish });
  const [formErrors, setFormErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (dish) {
      setFormData({
        name: dish.name,
        price: dish.price,
        description: dish.description,
        image: dish.image,
        inStock: dish.inStock,
        category: dish.category
      });
    }
  }, [dish]);

  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = 'Name is required';
    if (formData.price <= 0) errors.price = 'Price must be positive';
    if (!formData.description.trim()) errors.description = 'Description is required';
    if (!formData.image.trim()) errors.image = 'Image URL is required';
    return errors;
  };

  const handleInputChange = (e) => {
    const { name, value, checked, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    try {
      setIsLoading(true);
      const response = await axios.put(`${BASE_URL}/dishes/${dish._id}`, formData);
      
      if (response.status === 200) {
        dispatch(updateDish(response.data.dish));
        onClose();
      }
    } catch (error) {
      console.error('Error updating dish:', error);
      setFormErrors({ submit: error.response?.data?.message || 'Failed to update dish' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal open={true} onClose={onClose}>
      <Box sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 400,
        bgcolor: "background.paper",
        boxShadow: 24,
        p: 4,
        borderRadius: 2
      }}>
        <Typography variant="h6" component="h2" gutterBottom>
          Edit Dish
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Dish Name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            margin="normal"
            error={!!formErrors.name}
            helperText={formErrors.name}
            required
          />

          <TextField
            fullWidth
            label="Price"
            name="price"
            type="number"
            value={formData.price}
            onChange={handleInputChange}
            margin="normal"
            inputProps={{ min: 0 }}
            error={!!formErrors.price}
            helperText={formErrors.price || "Enter positive value"}
            required
          />

          <TextField
            fullWidth
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            margin="normal"
            multiline
            rows={3}
            error={!!formErrors.description}
            helperText={formErrors.description}
            required
          />

          <TextField
            fullWidth
            label="Image URL"
            name="image"
            value={formData.image}
            onChange={handleInputChange}
            margin="normal"
            error={!!formErrors.image}
            helperText={formErrors.image}
            required
          />

          <FormControl fullWidth margin="normal">
            <InputLabel>Category</InputLabel>
            <Select
              name="category"
              value={formData.category}
              label="Category"
              onChange={handleInputChange}
              required
            >
              <MenuItem value="veg">Vegetarian</MenuItem>
              <MenuItem value="non-veg">Non-Vegetarian</MenuItem>
            </Select>
          </FormControl>

          <FormControlLabel
            control={
              <Switch
                name="inStock"
                checked={formData.inStock}
                onChange={handleInputChange}
                color="primary"
              />
            }
            label="In Stock"
            sx={{ mt: 2 }}
          />

          {formErrors.submit && (
            <FormHelperText error sx={{ mt: 2 }}>
              {formErrors.submit}
            </FormHelperText>
          )}

          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
            <Button variant="outlined" onClick={onClose}>
              Cancel
            </Button>
            <Button 
              type="submit" 
              variant="contained" 
              color="primary"
              disabled={isLoading}
            >
              {isLoading ? <CircularProgress size={24} /> : 'Save Changes'}
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

export default EditDishModal;