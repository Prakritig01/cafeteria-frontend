import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    loading: false,
  },
  reducers: {
    updateQuantity: (state, action) => {
      const { id, increment } = action.payload;
      const product = state.items.find((item) => item.id === id);

      if (!product) return;

      product.quantity += increment;
      if (product.quantity === 0) {
        state.items = state.items.filter((item) => item.id !== id);
      }
    },
    toggleSelect: (state, action) => {
      const { id } = action.payload;
      const product = state.items.find((item) => item.id === id);

      if (!product) return;

      product.selected = !product.selected;
    },
    addToCart: (state, action) => {
      const product = action.payload; //{dish + quantity}

      const existingProduct = state.items.find(
        (item) => item.id === product.id
      );

      if (existingProduct) return;
      state.items.push(product);
    },
    removeFromCart: (state, action) => {
      const { id } = action.payload;
      state.items = state.items.filter((item) => item.id !== id);
    },
    resetCart: (state) => {
      state.items = [];
    },
    setCart: (state, action) => {
      state.items = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = !!action.payload;
    },
  },
});

export const selectItemFromCart = (state) => state.cart.items;
export const selectTotalForCart = (state) =>
  state.cart.items.reduce((total, item) => {
    if (item.selected) {
      return total + item.new_cost * item.quantity;
    }
    return total;
  }, 0);
export const selectTotalQuantity = (state) => state.cart.items.length;

export const selectLoading = (state) => state.cart.loading;

export const {
  updateQuantity,
  toggleSelect,
  addToCart,
  removeFromCart,
  resetCart,
  setCart,
  setLoading,
  
} = cartSlice.actions;
export default cartSlice.reducer;
