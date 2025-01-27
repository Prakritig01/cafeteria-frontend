import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/homePage";
import AdminPage from "./pages/AdminPage";
import CartPage from "./pages/CartPage";
import ProfilePage from "./pages/ProfilePage";
import MerchantPage from "./pages/MerchantPage";
import CounterPage from "./pages/CounterDetail";
import Navbar from "./components/Navbar";
import UserPage from "./pages/UserPage";
import { useEffect } from "react";
import { BASE_URL } from "./utils/apiConfig";
import { useDispatch } from "react-redux";
import { setLoading, setCurrentUser } from "./slices/authSlice";
import { setCart } from "./slices/cartSlice";
import axios from "axios";

function App() {
  const dispatch = useDispatch();
  const fetchCart = async () => {
    try {
      dispatch(setLoading(true));
      const response = await axios.get(`${BASE_URL}/cart`);
      const { user, cart } = response.data;
      dispatch(setCurrentUser(user));
      dispatch(setCart(cart));
    } catch (error) {
      console.log("error", error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <div className="app">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/merchant" element={<MerchantPage />} />
          {/* <Route path="/counter" element={<CounterPage />} /> */}
          <Route path="/users" element={<UserPage />} />
          <Route path="/counter/:counterId" element={<CounterPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
