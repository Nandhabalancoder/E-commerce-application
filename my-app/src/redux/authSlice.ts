import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk action creator for signing up
export const signup = createAsyncThunk(
  'auth/signup',
  async (userData: { username: string; password: string;admin:boolean }, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:3001/user', userData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data); // Pass error message as payload
    }
  }
);
export const fetchUserList = createAsyncThunk(
    "user/fetchUserList",
    async () => {
      const url = `http://localhost:3001/user`;
      try {
        const response = await axios.get(url); 
        if (response.status === 200) {
          if (response.data && response.data && response.data.length > 0) {
            return response.data;
          } else {
            throw new Error("Received empty or invalid data"); 
          }
        } else {
          throw new Error("Failed to fetch data: " + response.status);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        throw error; 
      }
    }
  );
  

// Async thunk action creator for logging in
export const login = createAsyncThunk(
    'auth/login',
    async (userData: { username: string; password: string;admin:boolean }, { rejectWithValue }) => {
      try {
        const response = await axios.post('http://localhost:3001/login', userData);
        return response.data;
      } catch (error: any) {
        return rejectWithValue(error.response.data);
      }
    }
  );
  

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    loading: false,
    error: null,
    userList:[]
  },
  reducers: {
    // Other reducers if needed
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(signup.rejected, (state: any, action) => {
        state.loading = false;
        state.error = action.payload; // Error message from the rejectWithValue
      })
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(login.rejected, (state: any, action) => {
        state.loading = false;
        state.error = action.payload; // Error message from the rejectWithValue
      })
      .addCase(fetchUserList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserList.fulfilled, (state, action) => {
        state.loading = false;
        state.userList = action.payload;
        state.error = null;
      })
      .addCase(fetchUserList.rejected, (state: any, action) => {
        state.loading = false;
        state.error = action.payload; // Error message from the rejectWithValue
      });
  },
});
export const { setUser } = authSlice.actions;
export const getUserList = (state: any) => state?.auth?.userList;
export const getUserLogedIn = (state: any) => state?.auth?.user;
export default authSlice.reducer;