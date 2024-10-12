import React, { useEffect } from "react";
import Row from "react-bootstrap/Row";
import { useDispatch, useSelector } from "react-redux";
import { getRandomMeal } from "./getRandomMeal";
import MealCard from "../meal-card/mealCard";

const RandomRecipes = () => {
  const { recipes, loading } = useSelector((state) => state.randomMeals);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRandomMeal());
  }, [dispatch]);

  console.log(recipes);

  return (
    <Row>
      {!loading &&
        recipes.map((recipe) => <MealCard key={recipe.idMeal} meal={recipe} />)}
    </Row>
  );
};

export default RandomRecipes;
