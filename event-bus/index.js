const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const axios = require("axios");
app.use(bodyParser.json());

app.post("/events", (req, res) => {
  const event = req.body;
  axios.post("http://post-clusterip-srv:4000/events", event).catch((err) => {
    console.log(err.message);
  });
  axios.post("http://comments-srv:4001/events", event).catch((err) => {
    console.log(err.message);
  });
  axios.post("http://query-srv:4002/events", event).catch((err) => {
    console.log(err.message);
  });
  axios.post("http://moderation-srv:4003/events", event).catch((err) => {
    console.log(err.message);
  });

  res.send({ status: "OK" });
});

app.listen(4005, () => {
  console.log("v21");
  console.log("Event bus is running on port 4005");
});
