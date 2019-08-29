var mongoose = require("mongoose");
var bcrypt = require("bcryptjs");

module.exports = router => {
  router.post("/:id", async (req, res, next) => {
    try {
      const saltRounds = 10;
      bcrypt.hash(req.body.password, saltRounds, async (err, hash) => {
        req.body.password = hash;
        await mongoose.model("users").findByIdAndUpdate(req.params.id, { ...req.body });
      });
      return res.redirect(`/users`);
    } catch (err) {
      next(err);
    }
  });
};
