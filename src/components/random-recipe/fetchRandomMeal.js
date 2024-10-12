import axios from "axios";

const SEARCH_URL = "https://www.themealdb.com/api/json/v1/1/random.php";

const fetchRandomMeal = async () => {
  const response1 = await axios.get(`${SEARCH_URL}`);
  const response2 = await axios.get(`${SEARCH_URL}`);
  const response3 = await axios.get(`${SEARCH_URL}`);
  const response4 = await axios.get(`${SEARCH_URL}`);
  return [
    response1.data.meals[0],
    response2.data.meals[0],
    response3.data.meals[0],
    response4.data.meals[0],
  ];
};

export default fetchRandomMeal;
