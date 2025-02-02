import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/homePage";
import AdminPage from "./pages/AdminPage";
import CartPage from "./pages/CartPage";
import ProfilePage from "./pages/ProfilePage";
import MerchantPage from "./pages/MerchantPage";
import CounterPage from "./pages/CounterDetail";
import Navbar from "./components/Navbar";
import LandingPage from "./pages/LandingPage";
import UserPage from "./pages/UserPage";
import { useEffect } from "react";
import { BASE_URL } from "./utils/apiConfig";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setCurrentUser, selectLoading } from "./slices/authSlice";
import { setCart } from "./slices/cartSlice";
import axios from "axios";
import NavbarLayout from "./components/NavbarLayout";
import RegisterPage from "./pages/RegisterPage";
import LoginPage, { Auth } from "./pages/LoginPage";
import { CircularProgress } from "@mui/material";


function App() {
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);

  const getUser = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      dispatch(setLoading(false));
      return;
    }

    dispatch(setLoading(true));
    const responseData = axios
      .get(`${BASE_URL}/auth/user`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        const { user } = response.data;
        // console.log(" in useEffect", user);
        dispatch(setCurrentUser(user));
        dispatch(setCart(user.cart || []));
      })
      .catch((err) => {
        console.error("Authentication failed:", err);
        localStorage.removeItem("token");
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  };

  useEffect(() => {
    console.log("App component mounted");
    getUser();
    return () => {
      console.log("App component unmounted");
    };
  }, []);

  // if (loading) {
  //   return (
  //     <div className="loading-screen">
  //       <CircularProgress />
  //     </div>
  //   );
  // }

  return (
    <div className="app">
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />

          <Route element={<Auth />}>
            <Route path="/home" element={<HomePage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/merchant" element={<MerchantPage />} />
            {/* <Route path="/counter" element={<CounterPage />} /> */}
            <Route path="/users" element={<UserPage />} />
            <Route path="/counter/:counterId" element={<CounterPage />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
