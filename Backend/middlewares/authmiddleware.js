const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const authMiddleware = asyncHandler(async (req, res, next) => {
  let token;
  if (req?.headers?.authorization?.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
    try {
      if (token) {
        // console.log(token);
        //verifing the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // console.log(decoded);
        const user = await User.findById(decoded?.id);
        req.user = user;
        next();
      }
    } catch (error) {
      throw new Error("Not authorized token expired,please login agian");
    }
  } else {
    throw new Error("Token not attached");
  }
});
const isAdmin = asyncHandler(async (req, res, next) => {
  //checking admin control

  const { email } = req.user;
  const adminuser = await User.findOne({ email });
  if (adminuser.role !== "admin") {
    throw new Error("you are not an admin");
  } else {
    next();
  }
});
module.exports = { authMiddleware, isAdmin };
