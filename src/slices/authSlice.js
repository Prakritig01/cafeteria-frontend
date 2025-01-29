import { createSlice } from "@reduxjs/toolkit";
import { act } from "react";

const authSlice = createSlice({
    name : 'auth',
    initialState : {
        currentUser : null,
        loading: true,
        merchantCounters : [],
        merchants : [],
    },
    reducers : {
        setCurrentUser : (state,action) =>{
            // console.log("action.payload",action.payload);
            const user = action.payload;
            state.currentUser = user;
        },
        removeCurrentUser : (state,action) => {
            state.currentUser = null;
            
        },
        setLoading: (state, action) => {
            state.loading = !!action.payload;
        },
        setMerchantCounters: (state, action) => {
            state.merchantCounters = action.payload;
        },
        updateMerchantCounters: (state, action) => {
            const updatedCounter = action.payload;
            const index = state.merchantCounters.findIndex((counter) => counter._id === updatedCounter._id);
            state.merchantCounters[index] = updatedCounter;
        },
        deleteMerchantCounter : (state,action) => {
            const counterId = action.payload._id;
            state.merchantCounters = state.merchantCounters.filter((counter) => counter._id !== counterId);
        },
        setMerchants : (state,action) => {
            // console.log("action.payload",action.payload);
            state.merchants = action.payload;
        },


    }
})

export const {setCurrentUser,removeCurrentUser,setLoading,setMerchantCounters,updateMerchantCounters,deleteMerchantCounter,setMerchants} = authSlice.actions;

export const selectCurrentUser = (state) => state.auth.currentUser;

export const selectLoading = (state) => state.auth.loading;

export const selectMerchantCounters = (state) => state.auth.merchantCounters;

export const selectAllMerchants = (state) => state.auth.merchants;

export default authSlice.reducer;