const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  const authHeader = req.header("Authorization");
  if (!authHeader)
    return res.status(401).json({
      status: "Unauthorized",
      statusCode: 401,
      message: "Access Denied: Please Insert Bearer Token",
    });

  const token = authHeader.split(" ")[1];
  if (!token)
    return res.status(401).json({
      status: "Unauthorized",
      statusCode: 401,
      message: "Access Denied: Please Use Valid Bearer Token",
    });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({
      status: "Unauthorized",
      statusCode: 401,
      message: "Sorry, Bearer Token Is Invalid",
    });
  }
};

module.exports = authenticate;
