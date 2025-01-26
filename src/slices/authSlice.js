import { createSlice } from "@reduxjs/toolkit";
import { act } from "react";

const authSlice = createSlice({
    name : 'auth',
    initialState : {
        currentUser : null,
        loading: true,
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
    }
})

export const {setCurrentUser,removeCurrentUser,setLoading} = authSlice.actions;

export const selectCurrentUser = (state) => state.auth.currentUser;

export default authSlice.reducer;