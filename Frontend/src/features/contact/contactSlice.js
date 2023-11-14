import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { contactService } from "./contactService";
import { toast } from "react-toastify";

export const postComment = createAsyncThunk(
  "contact/get",
  async (contactData, thunkApi) => {
    try {
      return await contactService.submitcomment(contactData);
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

const contactState = {
  contact: "",
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};
export const contactslice = createSlice({
  name: "product",
  initialState: contactState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(postComment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(postComment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.comment = action.payload;
        if (state.isSuccess === true) {
          toast.info("Submitted");
        }
      })
      .addCase(postComment.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload.response.data;
        if (state.isError === true) {
          toast.error("Rejected");
        }
      });
  },
});
export default contactslice.reducer;
