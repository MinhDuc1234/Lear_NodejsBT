var passport = require("passport");
var router = require("express").Router();

router.get("/", async (req, res, next) => {
  if(req.isAuthenticated()) {
    return res.redirect('/');
  } 
  return res.render("users/login");
});

router.post(
  "/",
  passport.authenticate("local", {
    failureRedirect: "/users/login",
    failureFlash: false
  }),
  (req, res) => {
    if (req.body.remember) {
      req.session.cookie.maxAge = new Date(
        Date.now() + 30 * 24 * 60 * 60 * 100000
      ); // Cookie expires after 30 days
    } else {
      req.session.cookie.expires = false; // Cookie expires at end of session
    }
    res.redirect("/");
  }
);

module.exports = router;