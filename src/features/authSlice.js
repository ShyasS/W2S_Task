import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const authSlice = createSlice({
  name : 'auth',
  initialState : {
    token : null,
  },
  reducers : {
    setToken : (state, action) => {
      state.token = action.payload;
    },
    logout : (state) => {
      state.token = null;
    }
  }
})
export const {setToken, logout} = authSlice.actions

export const login = (username, password) =>async(dispatch)=> {
  try{
    const response = await axios.post(' https://dummyjson.com/auth/login', {username, password});
    dispatch(setToken(response.data.token))
  }catch(err){
    console.log('Error fetching data', err)
  }
} 

export default authSlice.reducer;