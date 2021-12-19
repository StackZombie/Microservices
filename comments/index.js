const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { randomBytes } = require("crypto");

const app = express();

app.use(bodyParser.json());
app.use(cors());

const commentsByPostId = {};

app.get("/posts/:id/comments", (req, res) => {
  res.send(commentsByPostId[req.params.id]);
});

app.post("/posts/:id/comments", (req, res) => {
  const commentId = randomBytes(4).toString("hex");
  const postId = req.params.id;
  const content = req.body;

  const comments = commentsByPostId[postId] || [];
  comments.push({
    commentId,
    content,
  });
  commentsByPostId[postId] = comments;

  res.status(200).json({
    comments,
  });
});

app.listen(4002, () => {
  console.log("App is listening on PORT 4002");
});
