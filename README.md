# Product Listing And Management System(ProductHub-API)

A RESTful API for a Product Listing And Management System with user authentication, profile management, and product management.

## Overview

This includes RESTful API endpoints for registering users, authenticating users, updating users profile, deleting users profile, adding products, listing products, updating products and deleting products

## Project Structure

```md
/book-management-system
│
├── /views                   # EJS templates
│   └── welcomeEmail.ejs     # Welcome email template
├── /routes                  # Express routes
│   ├── auth.js              # Authentication routes (register, login)
│   ├── profile.js           # Profile management routes
│   └── books.js             # Book management routes
├── /controllers             # Route handlers
│   ├── authController.js    # Handles user registration, login, etc.
│   ├── profileController.js # Handles profile RUD operations
│   └── bookController.js    # Handles book CRUD operations
├── /models                  # Database models and schema
│   ├── userModel.js         # User model
│   └── bookModel.js         # Book model
├── /middlewares             # Protect admin routes
│   ├── authMiddleware.js    # Authenticate add, delete and update endpoints     
├── /config                  # Configuration files
│   └── db.js                # Database connection setup
├── .env                     # Stores environment variables
├── package-lock.json        # Project metadata
├── package.json             # Project metadata and dependencies
├── server.js                # server entry point
├── README.md                # Setup guide and documentation
└── app.js                   # Main application setup
```

## Features

- User authentication and authorization
- User profile management(updating and deletion)
- Product management(adding, listing, updating, deletion)

## Technologies

- Node.js
- Express.js
- MongoDB
- JWT for Authentication

## Setup and Installation

Before you begin, ensure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (v14 or later)
- [npm](https://www.npmjs.com/) (Node Package Manager, included with Node.js)
- [Git](https://git-scm.com/)

1: Fork this repository.

Fork this repository by clicking on the fork button on the top of this page, this will create a copy of this repository in your account.

2: Clone the repository.

`https://github.com/omotomiwa26/ProductHub-API`

`cd ProductHub-API`

3: Set up environment variables for .env file.

```md
PORT=your_localhost_server_port
JWT_SECRET=your_jwt_secret
DB_URI=your_database_uri
```

4: Install dependencies

`npm install express bcryptjs jsonwentoken mongoose body-parser ejs dotenv nodemailer nodemon cors`

5: Start the application

`npm start`

## API EndPoints Base URL

[ProductHub-API](https://budgetly-psi.vercel.app/)

## Postman Documentation

[Postman Endpoints Documentation](https://documenter.getpostman.com/view/38698911/2sAYJ1mi48)

## Entity Relationship Diagram

[ProductHub-API ERD](https://dbdiagram.io/d/Budgetly-Personal-Finance-Manager-676f2b225406798ef7caaf45)

![ProductHub-API ERD](https://github.com/CaptainSani/personal-finance-manager/blob/main/Budgetly.png?raw=true)
