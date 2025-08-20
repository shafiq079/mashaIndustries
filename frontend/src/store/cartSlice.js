import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import SummaryApi from '../common';

// Async thunk to fetch cart items
export const fetchCartItems = createAsyncThunk('cart/fetchCartItems', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(SummaryApi.addToCartProductView.url, { withCredentials: true });
    if (response.data.success) {
      return response.data.data;
    }
    return rejectWithValue(response.data.message);
  } catch (error) {
    return rejectWithValue(error.response.data.message || 'Failed to fetch cart items');
  }
});

const initialState = {
  items: [],
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartItems.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCartItems.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchCartItems.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default cartSlice.reducer;
