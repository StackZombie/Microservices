const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();

app.use(bodyParser.json());

app.post("/events", async (req, res) => {
  const { type, data } = req.body;
  if (type === "CommentCreated") {
    const { id, content, postId } = data;
    const status = data.content.includes("orange") ? "rejected" : "approved";
    try {
      await axios.post("http://localhost:4005/events", {
        type: "CommentModerated",
        data: {
          id,
          postId,
          status,
          content,
        },
      });
    } catch (err) {
      console.log(err);
    }
  }

  res.send({});
});

app.listen(4003, () => {
  console.log("Moderatio Listening on 4003");
});
