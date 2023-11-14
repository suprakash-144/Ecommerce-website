import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authService } from "./userService";
import { toast } from "react-toastify";
export const registerUser = createAsyncThunk(
  "auth/register",
  async (userData, thunkApi) => {
    try {
      return await authService.register(userData);
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);
export const loginUser = createAsyncThunk(
  "auth/login",
  async (userData, thunkApi) => {
    try {
      return await authService.login(userData);
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);
export const updateUser = createAsyncThunk(
  "auth/update",
  async (userData, thunkApi) => {
    try {
      return await authService.updateuser(userData);
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);
export const forgetPassword = createAsyncThunk(
  "auth/forgetpassword",
  async (userData, thunkApi) => {
    try {
      return await authService.forgetpassword(userData);
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);
export const resetPassword = createAsyncThunk(
  "auth/resetpassword",
  async (userData, thunkApi) => {
    try {
      return await authService.resetpassword(userData);
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);
export const getUserProductWishlist = createAsyncThunk(
  "user/wishlist",
  async (thunkApi) => {
    try {
      return await authService.getUserwishlist();
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);
export const getUserCart = createAsyncThunk(
  "user/cart/get",
  async (thunkApi) => {
    try {
      return await authService.GetCart();
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);
export const addUserCart = createAsyncThunk(
  "user/cart/add",
  async (data, thunkApi) => {
    try {
      return await authService.addToCart(data);
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);
export const removeCartProduct = createAsyncThunk(
  "user/cart/delete",
  async (id, thunkApi) => {
    try {
      return await authService.removeFromCart(id);
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);
export const updateCartProduct = createAsyncThunk(
  "user/cart/update",
  async (data, thunkApi) => {
    try {
      return await authService.updateFromCart(data);
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);
export const createUserOrder = createAsyncThunk(
  "user/cart/order",
  async (data, thunkApi) => {
    try {
      return await authService.createOrder(data);
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);
export const getUserOrder = createAsyncThunk(
  "user/order/get",
  async (data, thunkApi) => {
    try {
      return await authService.getOrders();
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);
const getuserfromlocalStorage = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;

const initialState = {
  user: getuserfromlocalStorage,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};
export const authslice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.createduser = action.payload;
        if (state.isSuccess === true) {
          toast.info("User created");
        }
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.payload.response.data;
        if (state.isError === true) {
          toast.info(state.message.message);
        }
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
        if (state.isSuccess === true) {
          localStorage.setItem("user", JSON.stringify(action.payload));
          localStorage.setItem("token", action.payload.token);
          toast.success(`Welcome back ${state.user.firstname} ! `);
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.payload.response.data;
        if (state.isError === true) {
          toast.error(state.message.message);
        }
      })
      .addCase(forgetPassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(forgetPassword.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.token = action.payload;
        if (state.isSuccess === true) {
          toast.success(`Email sent`);
        }
      })
      .addCase(forgetPassword.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.payload.response.data;
        if (state.isError === true) {
          toast.error(state.message.message);
        }
      })
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
        if (state.isSuccess === true) {
          toast.success(`Successfully changed ${state.user.firstname} ! `);
        }
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.payload.response.data;
        if (state.isError === true) {
          toast.error(state.message.message);
        }
      })
      .addCase(resetPassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        if (state.isSuccess === true) {
          toast.success(`Successfully changed ${state.user.firstname} ! `);
        }
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.payload.response.data;
        if (state.isError === true) {
          toast.error(state.message.message);
        }
      })
      .addCase(getUserProductWishlist.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserProductWishlist.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.wishlist = action.payload;
      })
      .addCase(getUserProductWishlist.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.payload.response.data;
        if (state.isError === true) {
          toast.error(state.message.message);
        }
      })
      .addCase(addUserCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addUserCart.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.cart = action.payload;
        if (state.isSuccess === true) {
          toast.success(`added to cart ! `);
        }
      })
      .addCase(addUserCart.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.payload.response.data;
        if (state.isError === true) {
          toast.error(state.message.message);
        }
      })
      .addCase(getUserCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserCart.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.cartproducts = action.payload;
      })
      .addCase(getUserCart.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.payload.response.data;
        if (state.isError === true) {
          toast.error(state.message.message);
        }
      })
      .addCase(removeCartProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(removeCartProduct.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.deletedcartproducts = action.payload;
      })
      .addCase(removeCartProduct.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.payload.response.data;
        if (state.isError === true) {
          toast.error(state.message.message);
        }
      })
      .addCase(updateCartProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateCartProduct.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.updatedcartproducts = action.payload;
      })
      .addCase(updateCartProduct.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.payload.response.data;
        if (state.isError === true) {
          toast.error(state.message.message);
        }
      })
      .addCase(createUserOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createUserOrder.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.orderedproduct = action.payload;
        if (state.isSuccess === true) {
          toast.success(`order sucessful ${state.user.firstname} ! `);
        }
      })
      .addCase(createUserOrder.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.payload.response.data;
        if (state.isError === true) {
          toast.error(state.message.message);
        }
      })
      .addCase(getUserOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserOrder.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.orderedlist = action.payload;
      })
      .addCase(getUserOrder.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.payload.response.data;
        if (state.isError === true) {
          toast.error(state.message.message);
        }
      });
  },
});
export default authslice.reducer;
