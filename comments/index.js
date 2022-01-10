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
  const { comment } = req.body;

  const comments = commentsByPostId[postId] || [];
  comments.push({
    id: commentId,
    comment,
    status: "pending",
  });

  commentsByPostId[postId] = comments;
  try {
    await axios.post("http://event-bus-srv:4005/events", {
      type: "CommentCreated",
      data: {
        id: commentId,
        comment,
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
    const { postId, id, status, comment } = data;

    const comments = commentsByPostId[postId];
    const foundComment = comments.find((comment) => comment.id === id);
    foundComment.status = status;
    try {
      await axios.post("http://event-bus-srv:4005/events", {
        type: "CommentUpdated",
        data: {
          id,
          postId,
          comment,
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
