/** @format */

const CustomApiError = require("../errors/custom-error");
const jwt = require("jsonwebtoken");
const { UnathenticatedError } = require("../errors");

const authenticationMiddleware = async (req, res, next) => {
  
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new UnathenticatedError(
        "not authorized to view resource no token provided"
      );
    }

    const token = authHeader.split(" ")[1];
    console.log(token);

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log(decoded);
        const { id, username } = decoded
        //since we are decoding it in our middleware we can set it back to our request user so we can access it in our controllers or through the req.user object
        //since we want to pass it on to the next piece of middleware
        req.user = {id, username}
    } catch (error) {
      throw new UnathenticatedError("not authorized to view resource no token provided");
    }
  next();
};

module.exports = authenticationMiddleware;
