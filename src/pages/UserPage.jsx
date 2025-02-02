import React, { useEffect, useState } from "react";
import NavbarLayout from "@/components/NavbarLayout";
import { useSelector, useDispatch } from "react-redux";
import {
  selectLoading,
  setLoading,
  setUsers,
  selectAllUsers,
  updateUserRole,
} from "@/slices/authSlice";
import {
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Select,
  MenuItem,
  FormControl,
  Snackbar,
  Alert,
  Avatar,
  Typography,
  Button,
  Modal,
  Box,
} from "@mui/material";
import axios from "axios";
import { BASE_URL } from "@/utils/apiConfig";
import { styled } from "@mui/system";
import { useCallback } from "react";

const TableWrapper = styled("div")({
  display: "flex",
  justifyContent: "center",
  width: "100%",
});

const StyledTableContainer = styled(TableContainer)({
  maxWidth: "80%",
  margin: "2rem auto",
  boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
  borderRadius: "15px",
});

const RoleSelect = styled(Select)({
  minWidth: "120px",
  "& .MuiSelect-select": {
    padding: "8px 32px 8px 12px",
  },
});

const ModalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "10px",
  textAlign: "center",
};

const UserPage = () => {
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);
  const users = useSelector(selectAllUsers);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  const fetchUsers = useCallback(async () => {
    if (!isInitialLoad) return; // Prevent refetching if not initial load
    
    const token = localStorage.getItem("token");
    if (!token) {
      setError("No authentication token found");
      return;
    }

    try {
      const response = await axios.get(`${BASE_URL}/users`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      dispatch(setUsers(response.data.users));
    } catch (error) {
      setError("Failed to fetch users");
    } finally {
      setIsInitialLoad(false);
    }
  }, [dispatch, isInitialLoad]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleRoleChange = useCallback((user, newRole) => {
    setSelectedUser({ id: user._id, name: user.name, newRole });
    setOpenModal(true);
  }, []);

  const confirmRoleChange = async () => {
    if (!selectedUser) return;
  
    const token = localStorage.getItem("token");
    if (!token) {
      setError("No authentication token found");
      return;
    }
  
    dispatch(setLoading(true));
    try {
      const response = await axios.patch(
        `${BASE_URL}/users/${selectedUser.id}`,
        { role: selectedUser.newRole },
        { headers: { Authorization: `Bearer ${token}` } }
      );
  
      console.log("Response:", response);
  
      dispatch(updateUserRole({
        userId: selectedUser.id,
        newRole: selectedUser.newRole,
      }));
  
      setSuccess("User role updated successfully");
    } catch (error) {
      console.error("Error occurred:", error);
  
      let errorMessage = "Failed to update user role"; // Default fallback message
  
      if (error.response) {
        console.error("Error response data:", error.response.data);
        errorMessage = error.response.data?.message || errorMessage;
      } else if (error.message) {
        console.error("Error message:", error.message);
        errorMessage = error.message;
      }
  
      // Handling the specific orphaned counter error
      if (errorMessage.includes("Cannot change role")) {
        errorMessage =
          "This merchant is the only one assigned to a counter and cannot be removed.";
      }

      console.log("errorMessage after changing", errorMessage);
  
      setError(errorMessage); // 🟢 SET ERROR BEFORE CLOSING MODAL
      
    } finally {
      dispatch(setLoading(false)); // 🟢 ENSURE LOADING IS RESET
      setOpenModal(false);
      setSelectedUser(null);
    }
  };
  

  if (loading && isInitialLoad) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <div className="mt-10">
      <Typography
        variant="h4"
        component="h1"
        sx={{ padding: "2rem", color: "primary.main", textAlign: "center" }}
      >
        User Management
      </Typography>

      <TableWrapper>
        <StyledTableContainer component={Paper}>
          <Table aria-label="user table">
            <TableHead sx={{ backgroundColor: "primary.light" }}>
              <TableRow>
                <TableCell>User</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Role</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user._id}>
                  <TableCell sx={{ display: "flex", alignItems: "center" }}>
                    <Avatar src={user.avatar} sx={{ marginRight: 2 }} />
                    {user.name}
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <FormControl size="small">
                      <RoleSelect
                        value={user.role}
                        onChange={(e) => handleRoleChange(user, e.target.value)}
                      >
                        <MenuItem value="admin">Admin</MenuItem>
                        <MenuItem value="customer">Customer</MenuItem>
                        <MenuItem value="merchant">Merchant</MenuItem>
                      </RoleSelect>
                    </FormControl>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </StyledTableContainer>
      </TableWrapper>

      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box sx={ModalStyle}>
          <Typography variant="h6">Confirm Role Change</Typography>
          <Typography sx={{ mt: 2 }}>
            Do you want to change the role of {selectedUser?.name}?
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
            <Button
              variant="contained"
              color="error"
              onClick={() => setOpenModal(false)}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={confirmRoleChange}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : 'Confirm'}
            </Button>
          </Box>
        </Box>
      </Modal>

      {/* <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={() => setError("")}
      >
        <Alert severity="error" sx={{ width: "100%" }}>
        {console.log("error", error)}
          {error}
        </Alert>
      </Snackbar>
      <Snackbar
        open={!!success}
        autoHideDuration={6000}
        onClose={() => setSuccess("")}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          console.log("here");
          {success}
        </Alert>
      </Snackbar> */}
      {/* <Modal open={Boolean(error)} onClose={() => setError(null)}>
  <div className="modal-content">
    <h2>Error</h2>
    <p>{error}</p>
    <button onClick={() => setError(null)}>OK</button>
  </div>
</Modal> */}

    </div>
  );
};

export default function UserManagementPage() {
  return (
    <NavbarLayout>
      <UserPage />
    </NavbarLayout>
  );
}