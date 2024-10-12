import axios from "axios";

const SEARCH_URL = process.env.REACT_MEAL_DETAILS || "https://www.themealdb.com/api/json/v1/1/lookup.php?i=";

export const mealDetailsService = async (mid) => {
  const mealdbResponse = await axios.get(`${SEARCH_URL}${mid}`);
  return mealdbResponse.data.meals[0];
};

export const getMealReviewsService = async (mid) => {
  const reponse = await axios.get(`$`);
};

export const postMealCommentService = async (comment) => {};
