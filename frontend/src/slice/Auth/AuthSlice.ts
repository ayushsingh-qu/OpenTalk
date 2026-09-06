import {createAsyncThunk ,createSlice} from '@reduxjs/toolkit'
import { SigninUser , SignupUser ,getCurrentUser, updateUserApi } from './AuthApi';
import type { AuthState } from './AuthTypes';


export const signup = createAsyncThunk(
  "auth/signup",
  async (data: {name:string, email: string; password: string },{ rejectWithValue }) => {
    
    try {
      return await SignupUser(data.name,data.email, data.password);
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || { message: "Something went wrong" }
      );
    }
  }
);

export const signin = createAsyncThunk(
  "auth/signin",
  async (data: { email: string; password: string },{ rejectWithValue }) => {

    try {
      return await SigninUser(data.email, data.password);
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || { message: "Something went wrong" }
      );
    }
  }
);

export const checkAuth = createAsyncThunk(
  "auth/me",
  async (_ ,{ rejectWithValue }) => {
    
    try {
      return await getCurrentUser();
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || { message: "Something went wrong" }
      );
    }
  }
);

export const updateUser = createAsyncThunk(
  "auth/updateUser",
  async (data: { name?: string; email?: string; password?: string }, { rejectWithValue }) => {
    try {
      return await updateUserApi(data);
    } catch (error: any) {
      return rejectWithValue(error.response?.data || { message: "Failed to update profile" });
    }
  }
);

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name:'Auth',
  initialState,
  reducers:{
     clearAuth: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
      localStorage.removeItem("token");
    },

    clearError: (state) => {
      state.error = null;
    },

  },

  extraReducers:(builder)=>{
    builder
 

    //signup user cases
    .addCase(signup.pending,(state)=>{
      state.loading=true;
      state.error=null;
    })

    .addCase(signup.fulfilled,(state,action)=>{
      state.loading=false;
      state.isAuthenticated=true; 
      state.user = action.payload.data;
    })

    .addCase(signup.rejected,(state,action:any)=>{
      state.loading=false;
      state.error = action.payload?.message || 'something went wrong';
      state.isAuthenticated=false;
      state.user = null;
    })


    //signin user cases
    .addCase(signin.pending,(state)=>{
      state.loading=true;
      state.error=null;
    })

    .addCase(signin.fulfilled,(state,action)=>{
      state.loading=false;
      state.isAuthenticated=true;  
      state.user = action.payload.data;
      console.log(action.payload.data)
      
    })

    .addCase(signin.rejected,(state,action:any)=>{
      state.loading=false;
      state.error = action.payload?.message || 'something went wrong'
      state.isAuthenticated=false;
      state.user = null;
    })


    //  checkAuth user cases
    .addCase(checkAuth.pending,(state)=>{
      state.loading=true;
      state.error=null;
    })

    .addCase(checkAuth.fulfilled,(state,action)=>{ 
      state.loading=false;
      state.isAuthenticated=true;  
      state.user = action.payload.data;
      console.log()
    })

    .addCase(checkAuth.rejected,(state,action:any)=>{
      state.loading=false;
      state.error = action.payload?.message || 'something went wrong'
      state.isAuthenticated=false;
      state.user = null;
      localStorage.removeItem("token");
    })

    // updateUser cases
    .addCase(updateUser.pending,(state)=>{
      state.loading=true;
      state.error=null;
    })
    .addCase(updateUser.fulfilled,(state,action)=>{
      state.loading=false;
      if (action.payload?.data) {
        state.user = action.payload.data;
      }
    })
    .addCase(updateUser.rejected,(state,action:any)=>{
      state.loading=false;
      state.error = action.payload?.message || 'something went wrong';
    })

  }

})

export const { clearAuth, clearError } = authSlice.actions;

export default authSlice.reducer;