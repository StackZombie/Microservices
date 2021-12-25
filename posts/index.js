const express = require("express");
const bodyParser = require("body-parser");
const { randomBytes } = require("crypto");
const cors = require("cors");
const corsOpt = require("./CorsOption");
const app = express();

app.use(bodyParser.json());

app.use(cors());

let posts = {};

app.post("/posts", (req, res) => {
  const id = randomBytes(4).toString("hex");
  const { title } = req.body;
  posts[id] = {
    id,
    title,
  };
  res.status(201).send(posts[id]);
});

app.get("/posts", (req, res) => {
  res.status(200).send(posts);
});

app.listen(4000, () => {
  console.log("Listening on port ", 4000);
});
