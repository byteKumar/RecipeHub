import { createSlice } from "@reduxjs/toolkit";
import { getRandomMeal } from "./getRandomMeal";

const initialState = {
  recipes: [],
  loading: false,
};

const randomMealSlice = createSlice({
  name: "randomMeals",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getRandomMeal.pending, (state) => {
        state.loading = true;
        state.recipes = [];
      })
      .addCase(getRandomMeal.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.recipes = payload;
      });
  },
});

export default randomMealSlice.reducer;
