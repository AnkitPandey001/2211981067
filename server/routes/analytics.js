const express = require("express");
const router = express.Router();
const axios = require("axios");

const BASE_URL = "http://20.244.56.144/evaluation-service";


const HEADERS = {
    headers: {
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzQ0NzAyMjEyLCJpYXQiOjE3NDQ3MDE5MTIsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6Ijg5ODI5ZGIzLTI1NzEtNGNhZS1hYzBkLTFlNzc4NThlM2U0MyIsInN1YiI6ImFua2l0MTA2Ny5iZTIyQGNoaXRrYXJhdW5pdmVyc2l0eS5lZHUuaW4ifSwiZW1haWwiOiJhbmtpdDEwNjcuYmUyMkBjaGl0a2FyYXVuaXZlcnNpdHkuZWR1LmluIiwibmFtZSI6ImFua2l0IGt1bWFyIHBhbmRleSIsInJvbGxObyI6IjIyMTE5ODEwNjciLCJhY2Nlc3NDb2RlIjoiUHd6dWZHIiwiY2xpZW50SUQiOiI4OTgyOWRiMy0yNTcxLTRjYWUtYWMwZC0xZTc3ODU4ZTNlNDMiLCJjbGllbnRTZWNyZXQiOiJQVGh5UWpDVkNqZlRNRVJIIn0.Gjx2jbNz02aCFxBNN2gXypwXZn06KetRY_3mvJITkEE`
    }
  };
  
  

router.get("/users", async (req, res) => {
  try {
    const response = await axios.get(`${BASE_URL}/users`, HEADERS);
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error });
  }
});

router.get("/users/:userId/posts", async (req, res) => {
  const { userId } = req.params;
  try {
    const response = await axios.get(`${BASE_URL}/users/${userId}/posts`, HEADERS);
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ error });
  }
});


router.get("/posts/:postId/comments", async (req, res) => {
  const { postId } = req.params;
  try {
    const response = await axios.get(`${BASE_URL}/posts/${postId}/comments`, HEADERS);
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching comments:", error);
    res.status(500).json({ error });
  }
});

module.exports = router;
