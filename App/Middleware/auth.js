const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.auththenticateUser = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.ACCESS_TOKEN, (err, data) => {
      if (err) {
        return res.status(403).json({
          success: false,
          time: new Date().toISOString(),
          message: "Opps, sorry please try again later.",
          data: err,
        });
      }

      req.data = data;
      next();
    });
  } else {
    res.status(401).json({
      success: false,
      time: new Date().toISOString(),
      message: "Your authorization is not credible.",
      data: {},
    });
  }
};
