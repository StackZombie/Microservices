const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const axios = require("axios");
app.use(bodyParser.json());

app.post("/events", (req, res) => {
  const events = req.body;
  axios.post("http://post-clusterip-srv/events", events);
  // axios.post("http://localhost:4001/events", events);
  // axios.post("http://localhost:4002/events", events);
  // axios.post("http://localhost:4003/events", events);

  res.send({ status: "OK" });
});

app.listen(4005, () => {
  console.log("Event bus is running on port 4005");
});
