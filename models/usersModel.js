const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

//creating Users schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    validate: {
      validator: function (username_check) {
        return username_check.length >= 3;
      },
      message: (props) =>
        `${props.value} is too short! Your username must have 3 or more characters.`,
    },
  },
  email: { type: String, required: true, unique: true },
  password: {
    type: String,
    required: true,
    validate: {
      validator: function (password_check) {
        return password_check.length >= 6;
      },
      message: (props) =>
        `${props.value} is too short! Your password must be 6 or more characters.`,
    },
  },
},
  { timestamps: true });

// Hash password before saving the user
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

//Creating Users model from users schema
module.exports = mongoose.model("User", userSchema);
