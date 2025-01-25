import { createSlice } from "@reduxjs/toolkit";

const counterSlice = createSlice({
    name : "counter",
    initialState :{
        counter : [],
        dishes : [],
        loading : true,
        currentCounter : null,
    },
    reducers : {
        setCounter : (state,action) => {
            state.counter = action.payload;
        },
        setLoading: (state, action) => {
            state.loading = !!action.payload;
        },
        setDishes : (state,action) => {
            state.dishes = action.payload;
        },
        setCurrentCounter : (state,action) => {
            state.currentCounter = action.payload;
        }
    }
})

export const selectAllCounters = (state) => state.counter.counter;

export const selectAllDishes = (state) => state.counter.dishes;

export const selectCurrentCounter = (state) => state.counter.currentCounter;

export const {setCounter,setLoading,setDishes,setCurrentCounter} = counterSlice.actions;

export default counterSlice.reducer;
