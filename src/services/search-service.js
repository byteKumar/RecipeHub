import axios from "axios";

const SEARCH_URL = process.env.REACT_SEARCH_URL || "https://www.themealdb.com/api/json/v1/1/search.php?s=";

export const findFoodBySearchTerm = async (term) => {
  try {
    const response = await axios.get(`${SEARCH_URL}${term}`);
    console.log(`${SEARCH_URL}${term}`);
    console.log(response.data);
    return response.data.meals;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
