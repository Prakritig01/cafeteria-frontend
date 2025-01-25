import  {configureStore}  from '@reduxjs/toolkit';
import CounterReducer from '@/slices/counterSlice';

export default configureStore({
    reducer : {
        counter : CounterReducer,
    }
})