import React, { useEffect, useMemo, useState } from "react";
import Button from "react-bootstrap/Button";
import Chart from "./chart";
import axios from "axios";

const BASE_API_URL = process.env.REACT_API_BASE || "http://localhost:4000";

function AdminDashboard() {
  const MONTHS = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  );

  const [userStats, setUserStats] = useState([]);
  const api = axios.create({ withCredentials: true });

  useEffect(() => {
    const getStats = async () => {
      try {
        const res = await api.get(`${BASE_API_URL}/stats`);
        const statsList = res.data.sort(function (a, b) {
          return a._id - b._id;
        });
        statsList.map((item) =>
          setUserStats((prev) => [
            ...prev,
            { name: MONTHS[item._id - 1], "New Users": item.total },
          ])
        );
      } catch (err) {
        console.log(err);
        throw err;
      }
    };
    getStats();
  }, [MONTHS]);

  const monthlyUserStats = userStats.slice(0, 12);

  const [reviews, setReviews] = useState([]);
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    api.get("http://localhost:4000/api/reviews").then((response) => {
      setReviews(response.data);
    });
  }, []);

  useEffect(() => {
    api.get("http://localhost:4000/blog").then((response) => {
      setBlogs(response.data);
    });
  }, []);

  const handleReviewDelete = (id) => {
    api
      .delete(`http://localhost:4000/api/reviews/meal/${id}`)
      .then(() => {
        const updatedReviews = reviews.filter((review) => review._id !== id);
        setReviews(updatedReviews);
      })
      .catch((error) => {
        console.error(`Error deleting blog with id ${id}: ${error.message}`);
      });
  };

  const handleBlogDelete = (id) => {
    api
      .delete(`http://localhost:4000/blog/${id}`)
      .then(() => {
        const updatedBlogs = blogs.filter((blog) => blog._id !== id);
        setBlogs(updatedBlogs);
      })
      .catch((error) => {
        console.error(`Error deleting blog with id ${id}: ${error.message}`);
      });
  };

  return (
    <div className="home">
      <h2>Monthly New Users</h2>
      <Chart data={monthlyUserStats} title="" grid dataKey="New Users" />

      {reviews.length > 0 && (
        <div className="reviews">
          <h2>All Reviews</h2>
          <ul>
            {reviews.map((review) => (
              <li key={review.id}>
                <p>{review.review}</p>
                <Button
                  variant={"danger"}
                  className={"me-2"}
                  onClick={() => handleReviewDelete(review._id)}
                >
                  Delete
                </Button>
              </li>
            ))}
          </ul>
        </div>
      )}
      
      {blogs.length > 0 && (
        <div className="blogs">
          <h2>All Blogs</h2>
          <ul>
            {blogs.map((blog) => (
              <li key={blog._id}>
                <h5>{blog.title}</h5>
                <p>Author: {blog.author.authorName}</p>
                <p>{blog.blog}</p>
                <Button
                  variant={"danger"}
                  className={"me-2"}
                  onClick={() => handleBlogDelete(blog._id)}
                >
                  Delete
                </Button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;
