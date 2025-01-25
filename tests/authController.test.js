const request = require("supertest");
const app = require("../app");
const User = require("../models/usersModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const ejs = require("ejs");

// Mocking nodemailer
jest.mock("nodemailer");
const sendMailMock = jest.fn();
nodemailer.createTransport.mockReturnValue({
  sendMail: sendMailMock,
});

// Mocking bcrypt
jest.mock("bcryptjs");
bcrypt.compare = jest.fn();

// Mocking jwt
jest.mock("jsonwebtoken");
jwt.sign = jest.fn();

// Mocking User model
jest.mock("../models/usersModel");

// Dummy data for tests
const mockUser = {
  _id: "123",
  username: "testuser",
  email: "p41858505@gmail.com",
  password: "hashedpassword123",
};

beforeEach(() => {
  jest.clearAllMocks();
});

// --------------------------------------------------//
//           User Registration and Login Tests       //
// ------------------------------------------------  //

describe("Auth Controller", () => {
  describe("Register Function", () => {
    it("should register a new user and send a welcome email", async () => {
      // Mock User.create and ejs.renderFile
      User.create.mockResolvedValue(mockUser);
      jest
        .spyOn(ejs, "renderFile")
        .mockResolvedValue("<p>Welcome, testuser</p>");

      const res = await request(app).post("/api/auth/v1/register").send({
        username: mockUser.username,
        email: mockUser.email,
        password: "password123",
      });

      expect(res.statusCode).toBe(201);
      expect(res.body.status).toBe("Success");
      expect(sendMailMock).toHaveBeenCalledWith(
        expect.objectContaining({
          to: mockUser.email,
          subject: "Welcome To ProductHub",
          html: expect.stringContaining("Welcome, testuser"),
        })
      );
      expect(User.create).toHaveBeenCalledWith({
        username: mockUser.username,
        email: mockUser.email,
        password: expect.any(String),
      });
    });

    it("should return 500 for errors during registration", async () => {
      User.create.mockRejectedValue(new Error("Registration error"));

      const res = await request(app).post("/api/auth/v1/register").send({
        username: "testuser",
        email: "p41858505@gmail.com",
        password: "password123",
      });

      expect(res.statusCode).toBe(500);
      expect(res.body.error).toBe(
        "Registration Failed, Please Try Again Later"
      );
    });
  });

  describe("Login Function", () => {
    it("should login the user and return a JWT token", async () => {
      User.findOne.mockResolvedValue(mockUser);
      bcrypt.compare.mockResolvedValue(true);
      jwt.sign.mockReturnValue("mock-jwt-token");

      const res = await request(app).post("/api/auth/v1/login").send({
        email: mockUser.email,
        password: "password123",
      });

      expect(res.statusCode).toBe(200);
      expect(res.body.status).toBe("Success");
      expect(res.body.token).toBe("mock-jwt-token");
      expect(User.findOne).toHaveBeenCalledWith({ email: mockUser.email });
      expect(bcrypt.compare).toHaveBeenCalledWith(
        "password123",
        mockUser.password
      );
      expect(jwt.sign).toHaveBeenCalledWith(
        { userId: mockUser._id },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_SECRET_EXPIRY }
      );
    });

    it("should return 401 for invalid credentials", async () => {
      User.findOne.mockResolvedValue(null);

      const res = await request(app).post("/api/auth/v1/login").send({
        email: mockUser.email,
        password: "wrongpassword",
      });

      expect(res.statusCode).toBe(401);
      expect(res.body.message).toBe(
        "Invalid Email Or Password, Please Try Again With Valid Credentials"
      );
    });

    it("should return 500 for errors during login", async () => {
      User.findOne.mockRejectedValue(new Error("Login error"));

      const res = await request(app).post("/api/auth/v1/login").send({
        email: "p41858505@gmail.com",
        password: "password123",
      });

      expect(res.statusCode).toBe(500);
      expect(res.body.error).toBe("Loging-In Failed, Please Try Again Later");
    });
  });
});
