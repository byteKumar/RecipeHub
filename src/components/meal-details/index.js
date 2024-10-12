import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useDispatch, useSelector } from "react-redux";
import { mealDetailsThunks } from "./meal-details-thunks";
import YoutubeEmbed from "./youtube-embed";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import {
  createReviewThunk,
  findReviewsByFoodThunk,
} from "../reviews/reviews-thunks";
import { userLikesFoodThunk } from "../likes/likes-thunks";
import CommentComponent from "./comment-component";
import Container from "react-bootstrap/Container";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faStar } from "@fortawesome/free-regular-svg-icons";
import {
  faHeart as faSolidHeart,
  faStar as faSolidStar,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import "./index.css";

const BASE_API_URL = process.env.REACT_API_BASE || "http://localhost:4000";
const USERS_URL = BASE_API_URL + "/users";

const api = axios.create({ withCredentials: true });

const MealDetails = () => {
  const { currentUser } = useSelector((state) => state.users);
  const { meal, loading } = useSelector((state) => state.mealDetails);
  const { reviews } = useSelector((state) => state.reviews);
  const dispatch = useDispatch();
  const { mid } = useParams();
  const [comment, setComment] = useState("");
  const [liked, setLiked] = useState(false);
  const [userLikes, setUserLikes] = useState([]);

  useEffect(() => {
    dispatch(mealDetailsThunks(mid));
    dispatch(findReviewsByFoodThunk(mid));
  }, []);

  const postMealComment = () => {
    const review = {
      idMeal: meal.idMeal,
      review: comment,
    };
    dispatch(createReviewThunk(review));
    setComment("");
    dispatch(findReviewsByFoodThunk(mid));
  };

  const reloadComments = () => {
    dispatch(findReviewsByFoodThunk(mid));
  };

  useEffect(() => {
    if (currentUser) {
      api.get(`${USERS_URL}/${currentUser._id}/likes`).then((response) => {
        setUserLikes(response.data);
        const isLiked = response.data.some(
          (like) => like.idMeal === meal.idMeal && like.liked
        );
        setLiked(isLiked);
      });
    }
  }, [currentUser, meal.idMeal]);

  const toggleMealLike = () => {
    if (!liked) {
      const like = {
        idMeal: meal.idMeal,
      };
      dispatch(userLikesFoodThunk(like));
      setLiked(true);
    } else {
      api
        .delete(`${USERS_URL}/${currentUser._id}/likes/${meal.idMeal}`)
        .then(() => {
          setLiked(false);
          setUserLikes(userLikes.filter((like) => like.idMeal !== meal.idMeal));
        })
        .catch((error) => console.log(error));
    }
  };

  const navigate = useNavigate();

  function handleGoBack(event) {
    event.preventDefault();
    navigate(-2);
  }

  const ingredientList = [20];
  ingredientList[0] = meal.strMeasure1 + " " + meal.strIngredient1;
  ingredientList[1] = meal.strMeasure2 + " " + meal.strIngredient2;
  ingredientList[2] = meal.strMeasure3 + " " + meal.strIngredient3;
  ingredientList[3] = meal.strMeasure4 + " " + meal.strIngredient4;
  ingredientList[4] = meal.strMeasure5 + " " + meal.strIngredient5;
  ingredientList[5] = meal.strMeasure6 + " " + meal.strIngredient6;
  ingredientList[6] = meal.strMeasure7 + " " + meal.strIngredient7;
  ingredientList[7] = meal.strMeasure8 + " " + meal.strIngredient8;
  ingredientList[8] = meal.strMeasure9 + " " + meal.strIngredient9;
  ingredientList[9] = meal.strMeasure10 + " " + meal.strIngredient10;
  ingredientList[10] = meal.strMeasure11 + " " + meal.strIngredient11;
  ingredientList[11] = meal.strMeasure12 + " " + meal.strIngredient12;
  ingredientList[12] = meal.strMeasure13 + " " + meal.strIngredient13;
  ingredientList[13] = meal.strMeasure14 + " " + meal.strIngredient14;
  ingredientList[14] = meal.strMeasure15 + " " + meal.strIngredient15;
  ingredientList[15] = meal.strMeasure16 + " " + meal.strIngredient16;
  ingredientList[16] = meal.strMeasure17 + " " + meal.strIngredient17;
  ingredientList[17] = meal.strMeasure18 + " " + meal.strIngredient18;
  ingredientList[18] = meal.strMeasure19 + " " + meal.strIngredient19;
  ingredientList[19] = meal.strMeasure20 + " " + meal.strIngredient20;
  return (
    <div className={"mt-3"}>
      <div className={"mb-2"}>
        <a
          onClick={handleGoBack}
          href="src/components/meal-details#"
          className={"text-decoration-none text-secondary"}
        >
          <i className="bi bi-arrow-left me-1"></i>Back
        </a>
      </div>
      {!loading && (
        <>
          <h2>{meal.strMeal}</h2>
          <h5>
            <span className="badge bg-secondary">{meal.strArea}</span>{" "}
            <span className="badge bg-secondary">{meal.strCategory}</span>
            <span
              className="wd-float-right wd-font-size-15px"
              disabled={!currentUser}
              onClick={() => toggleMealLike()}
            >
              {currentUser && liked && (
                <span className="wd-pointer">
                  <FontAwesomeIcon className="wd-yellow" icon={faSolidStar} />
                </span>
              )}
              {currentUser && !liked && (
                <span className="wd-pointer">
                  <FontAwesomeIcon className="wd-gray" icon={faStar} />
                </span>
              )}
            </span>
          </h5>
          <Container>
            <Row>
              <Col sm={"12"} md={"6"}>
                <img
                  className={"w-100 mb-3"}
                  alt={"Picture of " + meal.strMeal}
                  src={meal.strMealThumb}
                />

                <h4>Youtube Video:</h4>
                {meal.strYoutube && (
                  <YoutubeEmbed
                    embedId={meal.strYoutube.substring(
                      meal.strYoutube.indexOf("=") + 1
                    )}
                  />
                )}
              </Col>
              <Col>
                <h4>Ingredients:</h4>
                <ul>
                  {ingredientList.map(
                    (u) => !u.includes("null") && u.length > 2 && <li>{u}</li>
                  )}
                </ul>
                <h4>Instructions:</h4>
                <ol>
                  {typeof meal.strInstructions !== "undefined" &&
                    meal.strInstructions
                      .split("\r\n")
                      .map(
                        (u) =>
                          u.length > 4 &&
                          !u.toLowerCase().includes("step") && <li>{u}</li>
                      )}
                </ol>
              </Col>
            </Row>
          </Container>
          <hr />

          <h4>
            Comments
            <span className={"text-secondary"}>
              <i className="bi bi-dot"></i>
              {reviews.length}
            </span>
          </h4>
          <Container>
            {currentUser ? (
              <Form>
                <Form.Group className={"mb-2"}>
                  <FloatingLabel
                    controlId="floatingTextarea2"
                    label="Leave a comment here"
                  >
                    <Form.Control
                      as="textarea"
                      placeholder="Leave a comment here"
                      value={comment}
                      onChange={(event) => setComment(event.target.value)}
                      style={{ height: "6rem" }}
                    />
                  </FloatingLabel>
                  <Form.Text>Logged in as {currentUser.username}.</Form.Text>
                </Form.Group>

                <Button
                  variant="primary"
                  onClick={() => postMealComment()}
                  disabled={comment === ""}
                >
                  Post Comment
                </Button>
              </Form>
            ) : (
              <Alert variant={"warning"} className={"mb-3"}>
                Please login to comment.
              </Alert>
            )}
            <ul className={"list-group mb-3 mt-3"}>
              {reviews.map((u) => (
                <CommentComponent u={u} rerender={reloadComments} key={u._id} />
              ))}
            </ul>
          </Container>
        </>
      )}
    </div>
  );
};

export default MealDetails;
