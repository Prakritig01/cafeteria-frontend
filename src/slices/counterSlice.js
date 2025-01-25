import { createSlice } from "@reduxjs/toolkit";

const counterSlice = createSlice({
    name : "counter",
    initialState :{
        counter : [],
        loading : true,
    },
    reducers : {
        setCounter : (state,action) => {
            state.counter = action.payload;
        },
        setLoading: (state, action) => {
            state.loading = !!action.payload;
        },
    }
})

export const selectAllCounters = (state) => state.counter.counter;

export const {setCounter,setLoading} = counterSlice.actions;
export default counterSlice.reducer;
