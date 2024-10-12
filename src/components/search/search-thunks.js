import { createAsyncThunk } from "@reduxjs/toolkit";
import { findFoodBySearchTerm } from "../../services/search-service";

export const findFoodBySearchTermThunk = createAsyncThunk(
  "findFoodBySearchTerm",
  (term) => findFoodBySearchTerm(term)
);
