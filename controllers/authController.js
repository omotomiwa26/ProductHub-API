const User = require("../models/usersModel");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const ejs = require("ejs");
const bcrypt = require("bcryptjs");

// Register New User
exports.register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const newUser = await User.create({ username, email, password });

    // Render the EJS template to HTML
    const html = await ejs.renderFile(
      __dirname + "/../views/welcomeEmail.ejs",
      { username: newUser.username }
    );

    // Send Welcome Email Upon Successful Registration
    const transporter = nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE,
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: {
        name: "ProductHub",
        address: process.env.EMAIL_USER,
      },
      to: newUser.email,
      subject: "Welcome To ProductHub",
      html,
    };

    await transporter.sendMail(mailOptions);

    res.status(201).json({
      status: "Success",
      statusCode: 201,
      message: "New User Registered And Email Sent Succesfully",
    });
  } catch (error) {
    console.error("Error In Registration:", error.message);
    res.status(500).json({
      status: "Internal Server Error",
      statusCode: 500,
      error: "Registration Failed, Please Try Again Later",
    });
  }
};

// login For Registered User
exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      status: "Bad Request",
      statusCode: 400,
      error: "Please Input All Required Fields",
    });
  }

  try {
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({
        status: "Unathourized",
        statusCode: 401,
        message: "Invalid Email Or Password, Please Try Again With Valid Credentials",
      });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_SECRET_EXPIRY,
    });
    res.json({
      status: "Success",
      statusCode: 200,
      message: `User Logged-In Successfully`,
      token,
    });
  } catch (error) {
    console.error("Error Loging-In :", error.message);
    res.status(500).json({
      status: "Internal Server Error",
      statusCode: 500,
      error: "Loging-In Failed, Please Try Again Later",
    });
  }
};
