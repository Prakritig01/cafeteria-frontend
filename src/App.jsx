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


function App() {
   
  return (
    <div className="app">
      <Router>
        <Navbar/>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/merchant" element={<MerchantPage />} />
          <Route path="/counter" element={<CounterPage />} />
          <Route path="/users" element={<UserPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
