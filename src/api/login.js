var mongoose = require("mongoose");
var bcryptjs = require("bcryptjs");
var jwt = require("jsonwebtoken");
var config = require("config/index");

module.exports = router => {
  router.post("/", (req, res, next) => {
    let query = {
      username: req.body.username
    };
    mongoose.model("users").findOne(query, (err, userInfo) => {
      if (err)
        return res.json({
          success: false,
          message: "Authentication failed. Structure failed"
        });
      // Find user if user found in system start to compare password hash
      if (userInfo) {
        bcryptjs.compare(
          req.body.password,
          userInfo.password,
          (err, isMatch) => {
            if (err)
              return res.json({
                success: false,
                message:
                  "Authentication failed. Error in process checking Password"
              });
            if (isMatch) {
              // if user is found and password is right
              // crate a token with only our given payload
              let payload = {
                _id: userInfo._id
              };
              // Create token
              let token = jwt.sign(payload, config.serectKey, {
                expiresIn: "24h"
              });
              userInfo.password = null;
              res.json({
                success: true,
                message: "Enjoy this system!",
                data: {
                  token: token,
                  user: userInfo
                }
              });
            }
            // Check password has been hashed fail
            else {
              return res.status(403).json({
                success: false,
                message: "Authentication failed. Wrong password."
              });
            }
          }
        );
      }
      // If user not found, return notification
      else {
        return res.status(403).json({
          success: false,
          message: "Authentication failed. User not found."
        });
      }
    });
  });
};
