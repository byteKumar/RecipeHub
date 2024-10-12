import { createSlice } from "@reduxjs/toolkit";
import { findFoodBySearchTerm } from "../../services/search-service";
import { findFoodBySearchTermThunk } from "./search-thunks";

const initialState = {
  recipes: [],
  loading: false,
};

const searchReducer = createSlice({
  name: "search",
  initialState,
  extraReducers: {
    [findFoodBySearchTermThunk.fulfilled]: (state, action) => {
      state.recipes = action.payload;
    },
  },
});

export default searchReducer.reducer;
