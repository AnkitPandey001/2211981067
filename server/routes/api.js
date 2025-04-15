const express = require("express");
const router = express.Router();
const axios = require("axios");

const BASE_URL = "http://20.244.56.144/evaluation-service";

const HEADERS = {
    headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzQ0NzAyMjEyLCJpYXQiOjE3NDQ3MDE5MTIsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6Ijg5ODI5ZGIzLTI1NzEtNGNhZS1hYzBkLTFlNzc4NThlM2U0MyIsInN1YiI6ImFua2l0MTA2Ny5iZTIyQGNoaXRrYXJhdW5pdmVyc2l0eS5lZHUuaW4ifSwiZW1haWwiOiJhbmtpdDEwNjcuYmUyMkBjaGl0a2FyYXVuaXZlcnNpdHkuZWR1LmluIiwibmFtZSI6ImFua2l0IGt1bWFyIHBhbmRleSIsInJvbGxObyI6IjIyMTE5ODEwNjciLCJhY2Nlc3NDb2RlIjoiUHd6dWZHIiwiY2xpZW50SUQiOiI4OTgyOWRiMy0yNTcxLTRjYWUtYWMwZC0xZTc3ODU4ZTNlNDMiLCJjbGllbnRTZWNyZXQiOiJQVGh5UWpDVkNqZlRNRVJIIn0.Gjx2jbNz02aCFxBNN2gXypwXZn06KetRY_3mvJITkEE`
      }
};

router.get("/top-users", async (req, res) => {
  try {
    const usersRes = await axios.get(`${BASE_URL}/users`, HEADERS);
    const users = usersRes.data;

    const usersWithPostCounts = await Promise.all(users.map(async user => {
      const postsRes = await axios.get(`${BASE_URL}/users/${user.id}/posts`, HEADERS);
      const postCount = postsRes.data.length;

      const commentCount = await Promise.all(
        postsRes.data.map(async post => {
          const commentsRes = await axios.get(`${BASE_URL}/posts/${post.id}/comments`, HEADERS);
          return commentsRes.data.length;
        })
      );

      return {
        ...user,
        postCount,
        commentCount: commentCount.reduce((a, b) => a + b, 0)
      };
    }));

    usersWithPostCounts.sort((a, b) => b.postCount - a.postCount);
    res.json(usersWithPostCounts);
  } catch (error) {
    console.error("Error fetching top users:", error);
    res.status(500).json({ error: "Failed to fetch top users" });
  }
});


router.get("/trending-posts", async (req, res) => {
  try {
    const usersRes = await axios.get(`${BASE_URL}/users`, HEADERS);
    const users = usersRes.data;

    const allPosts = await Promise.all(users.map(async user => {
      const postsRes = await axios.get(`${BASE_URL}/users/${user.id}/posts`, HEADERS);
      return postsRes.data.map(post => ({
        ...post,
        user
      }));
    }));

    const flattenedPosts = allPosts.flat();

    const postsWithCommentCount = await Promise.all(
      flattenedPosts.map(async post => {
        const commentsRes = await axios.get(`${BASE_URL}/posts/${post.id}/comments`, HEADERS);
        return {
          ...post,
          commentCount: commentsRes.data.length
        };
      })
    );

    postsWithCommentCount.sort((a, b) => b.commentCount - a.commentCount);
    res.json(postsWithCommentCount);
  } catch (error) {
    console.error("Error fetching trending posts:", error);
    res.status(500).json({ error: "Failed to fetch trending posts" });
  }
});

router.get("/feed", async (req, res) => {
  try {
    const usersRes = await axios.get(`${BASE_URL}/users`, HEADERS);
    const users = usersRes.data;

    const allPosts = await Promise.all(users.map(async user => {
      const postsRes = await axios.get(`${BASE_URL}/users/${user.id}/posts`, HEADERS);
      return postsRes.data.map(post => ({
        ...post,
        user
      }));
    }));

    const flattenedPosts = allPosts.flat();

    const postsWithPreviewComments = await Promise.all(
      flattenedPosts.map(async post => {
        const commentsRes = await axios.get(`${BASE_URL}/posts/${post.id}/comments`, HEADERS);
        return {
          ...post,
          previewComments: commentsRes.data.slice(0, 2)
        };
      })
    );

    postsWithPreviewComments.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    res.json(postsWithPreviewComments);
  } catch (error) {
    console.error("Error fetching feed:", error);
    res.status(500).json({ error: "Failed to fetch feed" });
  }
});

module.exports = router;
