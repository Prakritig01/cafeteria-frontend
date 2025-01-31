import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  FormHelperText,
  Grid,
} from "@mui/material";

const AddCounterModal = ({ open, onClose, onSubmit, merchants }) => {
  const [formData, setFormData] = React.useState({
    name: "",
    description: "",
    image: "",
    merchantIds: [], // Changed to array to store multiple merchant IDs
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "merchantIds"
          ? Array.isArray(value)
            ? value
            : [value]
          : value,
    }));
  };

  const handleSubmit = () => {
    // Validate at least one merchant is selected
    if (formData.merchantIds.length === 0) {
      alert("Please select at least one merchant");
      return;
    }

    onSubmit(formData);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle className="text-lg font-semibold">
        Create New Counter
      </DialogTitle>
      <DialogContent dividers>
        <div className="space-y-4 pt-4">
          <Grid container spacing={2}>
            {/* Counter Name */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Counter Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                sx={{ mb: 2 }}
              />
            </Grid>

            {/* Description */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                multiline
                rows={3}
                sx={{ mb: 2 }}
              />
            </Grid>

            {/* Image URL */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Image URL"
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="https://example.com/image.jpg"
                sx={{ mb: 2 }}
              />
            </Grid>

            {/* Merchant Selection */}
            <Grid item xs={12}>
              <FormControl
                fullWidth
                required
                error={formData.merchantIds.length === 0}
                sx={{ mb: 2 }}
              >
                <InputLabel>Assign Merchants</InputLabel>
                <Select
                  multiple
                  name="merchantIds"
                  value={formData.merchantIds}
                  onChange={handleChange}
                  label="Assign Merchants"
                  renderValue={(selected) =>
                    selected
                      .map((id) =>
                        merchants.find((m) => m._id === id)?.name || "Unknown"
                      )
                      .join(", ")
                  }
                >
                  {merchants.map((merchant) => (
                    <MenuItem key={merchant._id} value={merchant._id}>
                      {merchant.name}
                    </MenuItem>
                  ))}
                </Select>
                {formData.merchantIds.length === 0 && (
                  <FormHelperText>At least one merchant is required</FormHelperText>
                )}
              </FormControl>
            </Grid>
          </Grid>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          color="primary"
          disabled={!formData.name || formData.merchantIds.length === 0}
        >
          Create Counter
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddCounterModal;
