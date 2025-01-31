import  {configureStore}  from '@reduxjs/toolkit';
import CounterReducer from '@/slices/counterSlice';
import CartReducer from '@/slices/cartSlice';
import AuthReducer from '@/slices/authSlice';

export default configureStore({
    reducer : {
        counter : CounterReducer,
        cart : CartReducer,
        auth : AuthReducer
    }
})