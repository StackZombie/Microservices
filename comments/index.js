const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { randomBytes } = require("crypto");

const app = express();
const axios = require("axios");
app.use(bodyParser.json());
app.use(cors());

const commentsByPostId = {};

app.get("/posts/:id/comments", (req, res) => {
  res.send(commentsByPostId[req.params.id]);
});

app.post("/posts/:id/comments", async (req, res) => {
  const commentId = randomBytes(4).toString("hex");
  const postId = req.params.id;
  const content = req.body;

  const comments = commentsByPostId[postId] || [];
  console.log("Content", content);
  comments.push({
    id: commentId,
    content,
    status: "pending",
  });

  commentsByPostId[postId] = comments;
  try {
    await axios.post("http://localhost:4005/events", {
      type: "CommentCreated",
      data: {
        id: commentId,
        content,
        postId,
        status: "pending",
      },
    });
  } catch (err) {
    console.log(err);
  }

  res.status(200).json({
    comments,
  });
});

app.post("/events", async (req, res) => {
  const { type, data } = req.body;
  if (type === "CommentModerated") {
    const { postId, id, status, content } = data;

    const comments = commentsByPostId(postId);
    const comment = comments.find((comment) => comment.id === id);
    comment.status = status;
    try {
      await axios.post("http://localhost:4005/events", {
        type: "CommentUpdated",
        data: {
          id,
          postId,
          content,
          status,
        },
      });
    } catch (err) {
      console.log(err);
    }
  }
  console.log("Received event", req.body);
  res.send({});
});

app.listen(4001, () => {
  console.log("App is listening on PORT 4001");
});
