import express from "express";
import axios from "axios";

const router = express.Router();

// Route to get all posts from JSON Server
router.get("/", async (req, res) => {
  try {
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/todos`
    );
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).send("Error fetching posts");
  }
});

router.get("/:id", (req, res) => {
  res.send(`test id yeeeeah ${req.params.id}`);
});

export default router;
