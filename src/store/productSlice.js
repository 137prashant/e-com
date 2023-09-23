import { createSlice } from "@reduxjs/toolkit";

export const productSlice = createSlice({
  name: "product",
  initialState: {
    data: [],
    oldData: []
  },
  reducers: {
    getAllProduct: (state, action) => {
      state.data = action.payload;
    },
    setOldData: (state, action)=>{
      state.oldData = action.payload;
    }
  },
});

export const { getAllProduct,setOldData } = productSlice.actions;

export default productSlice.reducer;
