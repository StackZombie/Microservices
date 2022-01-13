const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();

app.use(bodyParser.json());

app.post("/events", async (req, res) => {
  const { type, data } = req.body;
  if (type === "CommentCreated") {
    const { id, comment, postId } = data;
    const status = comment.includes("orange") ? "rejected" : "approved";
    try {
      await axios.post("http://event-bus-srv:4005/events", {
        type: "CommentModerated",
        data: {
          id,
          postId,
          status,
          comment,
        },
      });
    } catch (err) {
      console.log(err);
    }
  }

  res.send({});
});

app.listen(4003, () => {
  console.log("Moderation Listening on 4003");
});
