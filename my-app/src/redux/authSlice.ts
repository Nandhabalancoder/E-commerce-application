import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk action creator for logging in
export const login = createAsyncThunk(
    'auth/login',
    async (userData: { username: string; password: string }, { rejectWithValue }) => {
      try {
        const response = await axios.post('https://dummyjson.com/auth/login', userData);
        console.log(response)
        return response.data;
      } catch (error:any) {
        return rejectWithValue(error.response.data); // Pass error message as payload
      }
    }
  );
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {
    // Other reducers if needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(login.rejected, (state:any, action) => {
        state.loading = false;
        state.error = action.payload; // Error message from the rejectWithValue
      });
  },
});

// Export action creators and reducer
export const authActions = authSlice.actions;
export default authSlice.reducer;