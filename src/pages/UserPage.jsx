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

  const fetchUsers = async () => {
    try {
      dispatch(setLoading(true));
      const response = await axios.get(`${BASE_URL}/users`);
      dispatch(setUsers(response.data.users));
    } catch (error) {
      setError("Failed to fetch users");
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleRoleChange = (user, newRole) => {
    const updatedUser = { id: user._id,name: user.name, newRole };
    setSelectedUser(updatedUser);
    setOpenModal(true);
    console.log("Updated selectedUser:", updatedUser); // Correct logging
  };

  const confirmRoleChange = async () => {
    console.log("Selected user:", selectedUser); // Correct logging
    if (!selectedUser) return;
    try {
      dispatch(setLoading(true));
      await axios.patch(`${BASE_URL}/users/${selectedUser.id}`, {
        role: selectedUser.newRole,
      });
      dispatch(
        updateUserRole({
          userId: selectedUser.id,
          newRole: selectedUser.newRole,
        })
      );
      setSuccess("User role updated successfully");
    } catch (error) {
      setError("Failed to update user role");
    } finally {
      dispatch(setLoading(false));
      setOpenModal(false);
      setSelectedUser(null);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="mt-15">
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
                        onChange={(e) => {
                          handleRoleChange(user, e.target.value);
                        }}
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
            >
              Confirm
            </Button>
          </Box>
        </Box>
      </Modal>

      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={() => setError("")}
      >
        <Alert severity="error" sx={{ width: "100%" }}>
          {error}
        </Alert>
      </Snackbar>
      <Snackbar
        open={!!success}
        autoHideDuration={6000}
        onClose={() => setSuccess("")}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          {success}
        </Alert>
      </Snackbar>
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
