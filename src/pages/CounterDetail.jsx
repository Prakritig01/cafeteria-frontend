import {
  selectAllDishes,
  selectCurrentCounter,
  selectLoading,
  setCurrentCounter,
  setDishes,
  setLoading,
} from "@/slices/counterSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "./../utils/apiConfig";
import DishCard from "@/components/DishCard";
import CircularProgress from "@mui/material/CircularProgress";
import NavbarLayout from '@/components/NavbarLayout';
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
  Snackbar,
  Alert,
} from "@mui/material";
import { selectCurrentUser } from "@/slices/authSlice";
import { ROLE } from "@/constants";
import { Loader2 } from "lucide-react";

const LoadingOverlay = () => (
  <div className="fixed inset-0 backdrop-blur-xs z-50 flex items-center justify-center">
    <div className="bg-gray-400 rounded-lg p-4 flex items-center gap-3">
      <Loader2 className="h-6 w-6 text-white animate-spin" />
      <span className="text-gray-200">Processing...</span>
    </div>
  </div>
);

const CounterPage = () => {
  const { counterId } = useParams();
  const dispatch = useDispatch();
  const dishes = useSelector(selectAllDishes);
  const user = useSelector(selectCurrentUser);
  const currentCounter = useSelector(selectCurrentCounter);
  const isLoading = useSelector(selectLoading);

  // State for Add Dish Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    price: 0,
    description: '',
    image: '',
    inStock: true,
    category: 'veg'
  });
  const [formErrors, setFormErrors] = useState({});

  // State for UI notifications
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationSeverity, setNotificationSeverity] = useState("success");

  // State for Delete Confirmation Modal
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [dishToDelete, setDishToDelete] = useState(null);

  // Helper: show notifications
  const showNotification = (message, severity) => {
    setNotificationMessage(message);
    setNotificationSeverity(severity);
    setNotificationOpen(true);
  };

  // Validation for the add dish form
  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = 'Name is required';
    if (formData.price <= 0) errors.price = 'Price must be positive';
    if (!formData.description.trim()) errors.description = 'Description is required';
    if (!formData.image.trim()) errors.image = 'Image URL is required';
    return errors;
  };

  // Open/close Add Dish modal
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setFormErrors({});
    setFormData({
      name: '',
      price: 0,
      description: '',
      image: '',
      inStock: true,
      category: 'veg'
    });
  };

  // Add a new dish
  const handleAddDish = async (event) => {
    event.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    try {
      dispatch(setLoading(true));
      const response = await axios.post(
        `${BASE_URL}/dishes`,
        {
          ...formData,
          counter: currentCounter._id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      
      dispatch(setDishes([...dishes, response.data.dish]));

      // Optional: If you want to re-fetch data after successful addition
      // fetchData();

      showNotification("Dish added successfully", "success");
      handleCloseModal();
    } catch (error) {
      console.error('Error adding dish:', error);
      setFormErrors({ submit: error.response?.data?.message || 'Failed to add dish' });
      showNotification(error.response?.data?.message || "Failed to add dish", "error");
    } finally {
      dispatch(setLoading(false));
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value, checked, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Fetch current counter data and dishes list
  const fetchData = async () => {
    const token = localStorage.getItem('token');
    try {
      dispatch(setLoading(true));
      const counterResponse = await axios.get(`${BASE_URL}/counter/${counterId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const dishesResponse = await axios.get(`${BASE_URL}/dishes/counter/${counterId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      dispatch(setCurrentCounter(counterResponse.data.counter));
      dispatch(setDishes(dishesResponse.data.dishes));
    } catch (error) {
      console.error(error);
      showNotification("Failed to load counter data", "error");
    } finally {
      dispatch(setLoading(false));
    }
  };

  // Delete a dish by ID
  const handleDeleteDishConfirm = async () => {
    if (!dishToDelete) return;
    try {
      dispatch(setLoading(true));
      await axios.delete(`${BASE_URL}/dishes/${dishToDelete._id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      // Remove deleted dish from Redux store
      dispatch(setDishes(dishes.filter(dish => dish._id !== dishToDelete._id)));
      showNotification("Dish removed successfully", "success");
    } catch (error) {
      console.error("Error deleting dish:", error);
      showNotification(error.response?.data?.message || "Failed to remove dish", "error");
    } finally {
      setIsDeleteModalOpen(false);
      setDishToDelete(null);
      dispatch(setLoading(false));
    }
  };

  // Called from DishCard when delete is triggered
  const handleDeleteDish = (dish) => {
    setDishToDelete(dish);
    setIsDeleteModalOpen(true);
  };

  useEffect(() => {
    fetchData();
    return () => {
      dispatch(setDishes([]));
      dispatch(setCurrentCounter(null));
    };
  }, [counterId]);

  return (
    <div className="dishes-container py-6 px-4 w-full flex flex-col mt-14">
      {isLoading ? (
        <LoadingOverlay />
      ) : (
        <>
          {currentCounter ? (
            <h3 className="text-3xl font-bold text-center mt-2">{currentCounter.name}</h3>
          ) : (
            <p className="text-center text-gray-600">Counter information is not available.</p>
          )}

          <div className="add-dish-btn text-end mr-[15px] mb-4">
            {user && user.role === ROLE.MERCHANT && (
              <Button 
                variant="contained" 
                color="primary"
                onClick={handleOpenModal}
              >
                Add New Dish
              </Button>
            )}
          </div>

          <div className="dishes-wrapper mx-auto p-5 w-full">
            {dishes.length === 0 ? (
              <p className="text-center text-gray-600">
                No dishes available!
              </p>
            ) : (
              <div className="dishes flex flex-wrap gap-6 justify-center p-6 ">
                {dishes.map((dish) => (
                  // Pass onDelete prop to DishCard if the current user is a merchant.
                  <DishCard 
                    key={dish._id} 
                    dish={dish} 
                    onDelete={user && user.role === ROLE.MERCHANT ? handleDeleteDish : undefined} 
                  />
                ))}
              </div>
            )}
          </div>
        </>
      )}

      {/* Add Dish Modal */}
      <Modal open={isModalOpen} onClose={handleCloseModal}>
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
            Add New Dish
          </Typography>
          <form onSubmit={handleAddDish}>
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
            <FormControl fullWidth margin="normal" error={!!formErrors.category}>
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
              <Button variant="outlined" onClick={handleCloseModal}>
                Cancel
              </Button>
              <Button 
                type="submit" 
                variant="contained" 
                color="primary"
                disabled={isLoading}
              >
                {isLoading ? <CircularProgress size={24} /> : 'Add Dish'}
              </Button>
            </Box>
          </form>
        </Box>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal open={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)}>
        <Box sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 350,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
          textAlign: "center"
        }}>
          <Typography variant="h6" gutterBottom>
            Confirm Deletion
          </Typography>
          <Typography sx={{ mb: 3 }}>
            Are you sure you want to remove <strong>{dishToDelete?.name}</strong>?
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "space-around" }}>
            <Button variant="outlined" onClick={() => setIsDeleteModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="contained" color="error" onClick={handleDeleteDishConfirm}>
              Confirm
            </Button>
          </Box>
        </Box>
      </Modal>

      {/* Notification Snackbar */}
      <Snackbar
        open={notificationOpen}
        autoHideDuration={6000}
        onClose={() => setNotificationOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert 
          onClose={() => setNotificationOpen(false)} 
          severity={notificationSeverity} 
          sx={{ width: "100%" }}
        >
          {notificationMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default function () {
  return (
    <NavbarLayout>
      <CounterPage />
    </NavbarLayout>
  );
}
