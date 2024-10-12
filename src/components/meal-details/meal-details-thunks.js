import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getMealReviewsService,
  mealDetailsService,
  postMealCommentService,
} from "../../services/meal-details-service";

const BASE_API_URL = process.env.REACT_API_BASE || "http://localhost:4000";
const USER_API_URL = BASE_API_URL + "/meal";

export const mealDetailsThunks = createAsyncThunk(
  "mealDetailsThunks/get",
  async (mid) => await mealDetailsService(mid)
);

export const getMealReviewsThunk = createAsyncThunk(
  "meal/getComments",
  async (mid) => await getMealReviewsService(mid)
);

export const postMealCommentThunk = createAsyncThunk(
  "meal/postComment",
  async (comment) => await postMealCommentService(comment)
);
