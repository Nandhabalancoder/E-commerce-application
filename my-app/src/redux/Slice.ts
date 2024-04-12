import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchProducts = createAsyncThunk(
  "product/fetchProducts",
  async () => {
    const url = `http://localhost:3001/products`;
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
export const deleteProduct = createAsyncThunk( 
  'product/deleteProduct',
  async (productId: number) => {
    const url = `http://localhost:3001/products/${productId}`;
    try {
      const response = await axios.delete(url); 
      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error(`Failed to delete product: ${response.statusText}`);
      }
    } catch (error:any) {
      if (error.response && error.response.status === 404) {
        throw new Error(`Product with ID ${productId} not found`);
      } else {
        console.error("Error deleting product:", error);
        throw new Error("Failed to delete product. Please try again later.");
      }
    }
  }
);

interface Product {
  id: any;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: any;
}

export const editProduct = createAsyncThunk(
  'product/editProduct',
  async (product: Product) => {
    const { id, ...productData } = product;
    const url = `http://localhost:3001/products/${id}`;
    try {
      const response = await axios.put(url, productData); 
      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error(`Failed to edit product: ${response.statusText}`);
      }
    } catch (error: any) {
      console.error("Error editing product:", error);
      throw new Error("Failed to edit product. Please try again later.");
    }
  }
);

interface addProduct {
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: any;
}
export const addProduct = createAsyncThunk(
  'product/addProduct',
  async (product: addProduct) => {
    const {...productData } = product;
    const url = `http://localhost:3001/products`;
    console.log(productData)
    try {
      const response = await axios.post(url, productData); 
      if (response.status === 201) {
        return response.data;
      } else {
        throw new Error(`Failed to Added product: ${response.statusText}`);
      }
    } catch (error: any) {
      console.error("Error Add product:", error);
      throw new Error("Failed to add product. Please try again later.");
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
      })
      .addCase(deleteProduct.pending, (state:any) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(deleteProduct.fulfilled, (state:any, action:any) => {
        state.status = 'succeeded';
        // Remove the deleted product from the products array
        state.products = state.products.filter((product:any) => product.id !== action.payload.id); 
        state.error = null;
      })
      .addCase(deleteProduct.rejected, (state:any, action:any) => {
        state.status = 'failed';
        state.error = action.error
          ? action.error.message || 'Failed to delete product'
          : 'Failed to delete product';
      })
      .addCase(editProduct.pending, (state:any) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(editProduct.fulfilled, (state:any, action) => {
        state.status = 'succeeded';
        // Update the product in the products array
        state.products = state.products.map((product:any) => {
          if (product.id === action.payload.id) {
            return action.payload;
          }
          return product;
        });
        state.error = null;
      })
      .addCase(editProduct.rejected, (state:any, action) => {
        state.status = 'failed';
        state.error = action.error
          ? action.error.message || 'Failed to edit product'
          : 'Failed to edit product';
      })
      .addCase(addProduct.pending, (state:any) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(addProduct.fulfilled, (state:any, action) => {
        state.status = 'succeeded';
        state.products.push(action.payload);
        state.error = null;
      })
      .addCase(addProduct.rejected, (state:any, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to add product';
      });
  },
});

export const getProductList = (state: any) => state?.projectData?.products;

export default projectData.reducer;