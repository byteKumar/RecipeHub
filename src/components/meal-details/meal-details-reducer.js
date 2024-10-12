import { createSlice } from "@reduxjs/toolkit";
import { mealDetailsThunks } from "./meal-details-thunks";

const initialState = {
  meal: {},
  comments: [],
  loading: false,
};

const mealDetailsReducer = createSlice({
  name: "mealDetailsReducer",
  initialState,
  extraReducers: {
    [mealDetailsThunks.pending]: (state) => {
      state.loading = true;
      state.meal = {};
      state.comments = {};
    },
    [mealDetailsThunks.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.meal = payload;
    },
  },
});

export default mealDetailsReducer.reducer;
