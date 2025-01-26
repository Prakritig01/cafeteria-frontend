import React, { useState } from "react";
import { Modal, TextField, Button } from "@mui/material";
import axios from "axios";
import { BASE_URL } from "./../utils/apiConfig";
import { useDispatch } from "react-redux";
import { updateDish } from "@/slices/counterSlice";

const EditDishModal = ({ dish, onClose }) => {
    const dispatch = useDispatch();

  const [editedDish, setEditedDish] = useState({ ...dish }); // Initialize with the current dish

  const handleChange = (e) => {
    const { name, value } = e.target;
    // console.log("name", name);
    // console.log("value", value);
    setEditedDish({ ...editedDish, [name]: value }); // Update field values
  };

  const handleSave = async () => {
    try {
      // Send the updated dish data to the backend
      const response = await axios.put(`${BASE_URL}/dishes/${dish._id}`, editedDish);
  
      // Extract the updated dish from the response
      const updatedDish = response.data.dish;
  
      // Dispatch the updated dish to Redux store
      dispatch(updateDish(updatedDish));
  
      console.log("Dish updated successfully:", updatedDish);
  
      // Close the modal after saving
      onClose();
    } catch (error) {
      console.error("Failed to update dish", error);
    }
  };
  

  return (
    <Modal open onClose={onClose}>
      <div className="bg-white p-6 rounded-lg shadow-lg w-[75%] h-auto mx-auto mt-20">
        <h2 className="text-xl font-bold mb-4">Edit Dish</h2>
        <TextField
          label="Name"
          name="name"
          value={editedDish.name}
          onChange={handleChange}
          fullWidth
          className="mb-4"
        />
        <TextField
          label="Price"
          name="price"
          value={editedDish.price}
          onChange={handleChange}
          fullWidth
          className="mb-4"
        />
        <TextField
          label="Description"
          name="description"
          value={editedDish.description}
          onChange={handleChange}
          fullWidth
          className="mb-4"
        />
        <TextField
          label="Category"
          name="category"
          value={editedDish.category}
          onChange={handleChange}
          fullWidth
          className="mb-4"
        />
        <TextField
          label="In Stock"
          name="inStock"
          value={editedDish.inStock}
          onChange={(e) => handleChange({ target: { name: "inStock", value: e.target.checked } })}
          fullWidth
          className="mb-4"
        />
        <div className="flex justify-end gap-4">
          <Button onClick={onClose} variant="outlined" color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSave} variant="contained" color="primary">
            Save
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default EditDishModal;
