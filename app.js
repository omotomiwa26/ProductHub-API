const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/auth");
const profileRoutes = require("./routes/profile");
const productRoutes = require("./routes/product");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

// home route
app.get("/", (req, res) => {
  res.render("landingPage");

  // Use All Routes
  app.use("/api/v1", authRoutes);
  app.use("/api/v1", profileRoutes);
  app.use("/api/v1", productRoutes);
});

module.exports = app;
