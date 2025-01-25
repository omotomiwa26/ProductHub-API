const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");


const authRoutes = require("./routes/auth");
const profileRoutes = require("./routes/profile");
const productRoutes = require("./routes/product");


const app = express();


app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));


app.set("view engine", "ejs");


 // Use All Routes
 app.use("/api/auth/v1", authRoutes);
 app.use("/api/v1", profileRoutes);
 app.use("/api/v1", productRoutes);

// home route
app.get("/", (req, res) => {
  res.render("landingPage");
});

module.exports = app;
