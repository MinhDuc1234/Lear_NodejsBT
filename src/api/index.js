var router = require("express").Router();
var jwt = require("jsonwebtoken");

require('api/login')(router)

router.use('/i', require('api/withoutToken'));

// Every connection with different to pathname = /admin to server has to proccess this function expect authenticate 
router.use((req, res, next) => {
  // Check header or url parameters or post content token
  let token =
    req.body.token || req.query.token || req.headers["x-access-token"];
  // decode token
  if (token) {
    // Verify secrect and checks exp
    jwt.verify(token, req.app.get("topSecretKey"), (err, decoded) => {
      if (err) {
        return res.status(406).json({
          success: false,
          message: `Failed to authenticate token. ${err.message}`
        });
      } else {
        // If everthing is good, save to request for use in other routes
        mongoose.model("users").findById(decoded._id, (err, userInfo) => {
          if (err) return constants.errorProcess(res, err);
          if (userInfo) {
            req.user = userInfo;
            next();
          } else {
            return res.status(403).send({
              success: false,
              message: "Token unavailable",
              data: null
            });
          }
        });
      }
    });
  } else {
    // If there is no token
    // Return an error
    return res.status(403).send({
      success: false,
      message: "No token provide."
    });
  }
});

router.use('/h', require('api/withToken'));

module.exports = router;
