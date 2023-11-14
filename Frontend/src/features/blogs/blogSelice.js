import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { blogService } from "./blogService";

export const getallblogs = createAsyncThunk("blogs/get", async (thunkApi) => {
  try {
    return await blogService.getallBlogs();
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});
export const getAblog = createAsyncThunk("blog/get", async (id, thunkApi) => {
  try {
    return await blogService.getaBlog(id);
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});

const BlogsState = {
  blog: "",
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};
export const blogslice = createSlice({
  name: "blogs",
  initialState: BlogsState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getallblogs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getallblogs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.blog = action.payload;
      })
      .addCase(getallblogs.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getAblog.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAblog.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.Singleblog = action.payload;
      })
      .addCase(getAblog.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      });
  },
});
export default blogslice.reducer;
