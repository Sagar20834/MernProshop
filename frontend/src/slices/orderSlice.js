import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  loading: true,
  error: null,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
});
