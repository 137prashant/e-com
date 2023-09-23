import { createSlice } from "@reduxjs/toolkit";

export const productSlice = createSlice({
  name: "product",
  initialState: {
    data: [],
  },
  reducers: {
    getAllProduct: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { getAllProduct } = productSlice.actions;

export default productSlice.reducer;
