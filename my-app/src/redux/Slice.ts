import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchProducts = createAsyncThunk(
  "product/fetchProducts",
  async () => {
    const url = `https://dummyjson.com/products`;
    try {
      const response = await axios.get(url); 
      if (response.status === 200) {
        if (response.data && response.data.products && response.data.products.length > 0) {
          return response.data.products;
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

interface StateProps {
  products: any[];
}

const initialState: StateProps = {
  products: [],
};

const projectData = createSlice({
  name: "projectDetails",
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload; 
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state:any) => {
        state.status = "loading";
        state.error = null;
        state.products = null; 
      })
      .addCase(fetchProducts.fulfilled, (state:any, action) => {
        state.status = "succeeded";
        state.products = action.payload; 
        state.error = null;
      })
      .addCase(fetchProducts.rejected, (state:any, action) => {
        state.status = "failed";
        state.error = action.error
          ? action.error.message || "Failed to fetch data"
          : "Failed to fetch data";
      });
  },
});

export const getProductList = (state: any) => state?.projectData?.products;

export default projectData.reducer;