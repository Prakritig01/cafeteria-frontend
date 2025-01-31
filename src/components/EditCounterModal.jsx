import React, { useEffect, useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Select, MenuItem, Checkbox, ListItemText } from "@mui/material";

const EditCounterModal = ({ counter, open, onClose, onSave, merchants }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: "",
    merchant: [], // Existing merchant array
    merchantIds: [], // ✅ FIX: Add merchantIds for Select dropdown
  });

  // ✅ FIX: Properly initialize `merchantIds` from `counter.merchant`
  useEffect(() => {
    if (counter) {
      setFormData({
        name: counter.name || "",
        description: counter.description || "",
        image: counter.image || "",
        merchant: counter.merchant || [],
        merchantIds: counter.merchant.map((m) => m._id) || [], // ✅ Ensure merchantIds gets ObjectIds
      });
    }
  }, [counter]);

  // ✅ FIX: Ensure selected merchants are properly updated
  const handleMerchantChange = (event) => {
    setFormData({
      ...formData,
      merchantIds: event.target.value, // ✅ Updating merchantIds directly
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, description, image, merchantIds } = formData;

    const updatedCounter = {
      ...counter,
      name,
      description,
      image,
      merchant: merchantIds, // ✅ FIX: Send merchantIds instead of whole merchant objects
    };

    onSave(updatedCounter);
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>Edit Counter</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          label="Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          margin="dense"
        />
        <TextField
          fullWidth
          label="Description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          margin="dense"
        />
        <TextField
          fullWidth
          label="Image URL"
          value={formData.image}
          onChange={(e) => setFormData({ ...formData, image: e.target.value })}
          margin="dense"
        />

        {/* ✅ FIX: Use merchantIds in Select */}
        <Select
          fullWidth
          multiple
          value={formData.merchantIds} // ✅ FIX: Use merchantIds instead of merchant
          onChange={handleMerchantChange}
          renderValue={(selected) =>
            selected.map((id) => merchants.find((m) => m._id === id)?.name).join(", ")
          }
        >
          {merchants.map((merchant) => (
            <MenuItem key={merchant._id} value={merchant._id}>
              <Checkbox checked={formData.merchantIds.includes(merchant._id)} />
              <ListItemText primary={merchant.name} />
            </MenuItem>
          ))}
        </Select>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditCounterModal;
