const express = require("express");
const cors = require("cors");

const {appMiddleware, afterMiddleware} = require("./src/middleware");
const db = require("./src/models");

const app = express();

require('dotenv').config()

var corsOptions = {
  // origin: "http://localhost:8080"
  origin: "*"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// serve your file as static
app.use(express.static(__dirname));

db.sequelize.sync({ alter: true })
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });


appMiddleware(app);

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to travel-app application." });
});

require("./src/routes/resort.route")(app);
require("./src/routes/location.route")(app);
require("./src/routes/user.route")(app);
require("./src/routes/order.route")(app);
require("./src/routes/feedback.route")(app);
require("./src/auth/auth.route")(app);
require("./src/payment/payment.route")(app);

afterMiddleware(app);

// set port, listen for requests
const PORT = process.env.PORT || 5678;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
