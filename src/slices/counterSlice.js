import { createSlice } from "@reduxjs/toolkit";

const counterSlice = createSlice({
  name: "counter",
  initialState: {
    counter: [],
    dishes: [],
    loading: false,
    currentCounter: null,
  },
  reducers: {
    setCounter: (state, action) => {
      state.counter = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = !!action.payload;
    },
    setDishes: (state, action) => {
      state.dishes = action.payload;
    },
    setCurrentCounter: (state, action) => {
      state.currentCounter = action.payload;
    },
    updateDish: (state, action) => {
      const updatedDish = action.payload;
      const index = state.dishes.findIndex(
        (dish) => dish._id === updatedDish._id
      );
      state.dishes[index] = updatedDish;
    },
    deleteDish: (state, action) => {
      const dishId = action.payload._id;
      console.log("dishId", dishId);
      state.dishes = state.dishes.filter((dish) => dish._id !== dishId);
    },
    updateCounter: (state, action) => {
      const updatedCounter = action.payload;
      const index = state.counter.findIndex(
        (c) => c._id === updatedCounter._id
      );
      if (index !== -1) {
        state.counter[index] = updatedCounter;
      }
    },
  },
});

export const selectAllCounters = (state) => state.counter.counter;

export const selectAllDishes = (state) => state.counter.dishes;

export const selectCurrentCounter = (state) => state.counter.currentCounter;

export const selectLoading = (state) => state.counter.loading;

export const {
  setCounter,
  setLoading,
  setDishes,
  setCurrentCounter,
  updateDish,
  deleteDish,
  updateCounter,
} = counterSlice.actions;

export default counterSlice.reducer;
