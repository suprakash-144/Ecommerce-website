import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { productService } from "./productService";

export const getallproduct = createAsyncThunk(
  "product/get",
  async (thunkApi) => {
    try {
      return await productService.getallProducts();
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);
export const getSingleproduct = createAsyncThunk(
  "product/getsingleproduct",
  async (id, thunkApi) => {
    try {
      return await productService.getSingleProducts(id);
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);
export const addtoWishlist = createAsyncThunk(
  "product/wishlist",
  async (prodId, thunkApi) => {
    try {
      return await productService.addtoWishlist(prodId);
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);
const productState = {
  product: "",
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};
export const productslice = createSlice({
  name: "product",
  initialState: productState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getallproduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getallproduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.product = action.payload;
      })
      .addCase(getallproduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getSingleproduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSingleproduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.Singleproduct = action.payload;
      })
      .addCase(getSingleproduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(addtoWishlist.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addtoWishlist.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.addtowishlist = action.payload;
        state.message = "Product added to wishlist";
      })
      .addCase(addtoWishlist.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload.response.data;
      });
  },
});
export default productslice.reducer;
