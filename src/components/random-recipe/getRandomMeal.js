import { createAsyncThunk } from "@reduxjs/toolkit";
import fetchRandomMeal from "./fetchRandomMeal";

export const getRandomMeal = createAsyncThunk(
  "getRandomMeal",
  async () => await fetchRandomMeal()
);
export default getRandomMeal;
