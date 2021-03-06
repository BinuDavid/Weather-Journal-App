// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require("express");
// Start up an instance of app
const app = express();

/* Middleware*/
const bodyParser = require("body-parser");
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());

// Initialize the main project folder
app.use(express.static("website"));

// Setup Server
const port = 3000;

const server = app.listen(port, () => {
  console.log(`The server is running on port ${port}`);
});

// GET route
app.get("/all", function (req, res) {
  console.info("Get Route", projectData);
  res.send(projectData);
});

// POST route
app.post("/", function (req, res) {
  const data = req.body;

  projectData.temp = data.temp;
  projectData.date = data.date;
  projectData.user = data.user;

  console.info("Post Route", projectData);
  res.send(projectData);
});
