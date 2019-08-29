var router = require("express").Router();


module.exports = router => {
  router.get("/logout", async (req, res, next) => {
    if (req.isAuthenticated()) {
      req.logout();
    }
    return res.redirect("/users/login");
  });
}
