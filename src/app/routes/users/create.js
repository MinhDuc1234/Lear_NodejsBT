var mongoose = require("mongoose");
var bcrypt = require("bcryptjs");

module.exports = router => {
  router.post("/", async (req, res, next) => {
    try {
      const saltRounds = 10;
      bcrypt.hash(req.body.password, saltRounds, async (err, hash) => {
        req.body.password = hash;
        await mongoose.model("users").create({ ...req.body });
      });
      return res.redirect(`/users`);
    } catch (err) {
      next(err);
    }
  });
};
