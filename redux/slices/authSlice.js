import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../utils/api";
import axios from "axios";

export const loginAsync = createAsyncThunk(
  "auth/loginAsync",
  async (credentials, { dispatch, rejectWithValue }) => {
    try{
        dispatch(getLoginRequest())
        console.log('payload', credentials);
         const { data } = await api.post('/user/login', credentials)  
        console.log('login-data', data);
        dispatch(getLoginSuccess(data.accessToken))
    }
    catch(error){
        dispatch(getLoginFail(error.response.data.message))
        return rejectWithValue('An error occurred')
    }

  }
);

const initialState = {
  isAuthenticated: false,
  data: null,
  loading: false,
  error: false,
  errorMessage: null
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    getLoginRequest: (state)=>{
        state.loading = true
    },
    getLoginSuccess: (state, action)=>{
        state.isAuthenticated = true
        state.data = action.payload
    },
    getLoginFail: (state, action)=>{
        state.error = true
        state.errorMessage = action.payload
    },
    clearLog:(state, action)=>{
      state.error = false
      state.errorMessage = null
      state.loading = false
    },
    logout:(state)=>{
      state.isAuthenticated = false
      state.data = null
    }
  },
});

export const {
    getLoginFail,
    getLoginRequest,
    getLoginSuccess,
    clearLog,
    logout
    } = authSlice.actions

export default authSlice;
