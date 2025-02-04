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
  const [selectedUser, setSelectedUser] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationSeverity, setNotificationSeverity] = useState("success");
  const [roleFilter, setRoleFilter] = useState("");

  const showNotification = (message, severity) => {
    setNotificationMessage(message);
    setNotificationSeverity(severity);
    setNotificationOpen(true);
  };
  

  // In useEffect
  useEffect(() => {
    const fetchUsers = async () => {
      if (!isInitialLoad) return;

      const token = localStorage.getItem("token");
      if (!token) {
        setNotificationMessage("No authentication token found");
        setNotificationSeverity("error");
        setNotificationOpen(true);
        return;
      }

      try {
        const response = await axios.get(`${BASE_URL}/users`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        dispatch(setUsers(response.data.users));
      } catch (error) {
        setNotificationMessage("Failed to fetch users");
        setNotificationSeverity("error");
        setNotificationOpen(true);
      } finally {
        setIsInitialLoad(false);
      }
    };

    fetchUsers();
  }, [isInitialLoad, dispatch]);

  const handleRoleChange = useCallback((user, newRole) => {
    setSelectedUser({ id: user._id, name: user.name, newRole });
    setOpenModal(true);
  }, []);

  const confirmRoleChange = async () => {
    if (!selectedUser) return;

    try {
      // Optimistically update UI
      dispatch(
        updateUserRole({
          userId: selectedUser.id,
          newRole: selectedUser.newRole,
        })
      );

      await axios.patch(
        `${BASE_URL}/users/${selectedUser.id}`,
        { role: selectedUser.newRole },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      showNotification("User role updated successfully", "success");
    } catch (error) {
      // Rollback on error
      dispatch(
        updateUserRole({
          userId: selectedUser.id,
          newRole: users.find((u) => u._id === selectedUser.id).role, // Revert to original
        })
      );

      let errorMessage =
        error.response?.data?.message || "Failed to update role";
      if (errorMessage.includes("Cannot change role")) {
        errorMessage =
          "This merchant is the only one assigned to counter and cannot be removed. Please assign another merchant before proceeding.";
      }
      showNotification(errorMessage, "error");
    } finally {
      setOpenModal(false);
      setSelectedUser(null);
    }
  };

  if (loading && isInitialLoad) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
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

      <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
        <FormControl variant="outlined" size="small" sx={{ minWidth: 120 }}>
          <Select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            displayEmpty
          >
            <MenuItem value="">All Roles</MenuItem>
            <MenuItem value="admin">Admin</MenuItem>
            <MenuItem value="customer">Customer</MenuItem>
            <MenuItem value="merchant">Merchant</MenuItem>
          </Select>
        </FormControl>
      </Box>

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
              {users.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={3} align="center" sx={{ py: 4 }}>
                    <Typography variant="subtitle1" color="textSecondary">
                      No users available
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                users.map((user) => (
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
                          onChange={(e) =>
                            handleRoleChange(user, e.target.value)
                          }
                          disabled={loading && selectedUser?.id === user._id}
                        >
                          <MenuItem value="admin">Admin</MenuItem>
                          <MenuItem value="customer">Customer</MenuItem>
                          <MenuItem value="merchant">Merchant</MenuItem>
                          {loading && selectedUser?.id === user._id && (
                            <CircularProgress size={20} sx={{ ml: 2 }} />
                          )}
                        </RoleSelect>
                      </FormControl>
                    </TableCell>
                  </TableRow>
                ))
              )}
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
              {loading ? <CircularProgress size={24} /> : "Confirm"}
            </Button>
          </Box>
        </Box>
      </Modal>

      <Snackbar
        open={notificationOpen}
        autoHideDuration={6000}
        onClose={() => setNotificationOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          severity={notificationSeverity}
          sx={{ width: "100%" }}
          onClose={() => setNotificationOpen(false)}
        >
          {notificationMessage}
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
