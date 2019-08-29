const { DEFAULT_LIMIT_DATA_PER_REQUEST } = require("config/constants");
const { errorProcess, success } = require("services/returnToUser");
var router = require("express").Router();
var mongoose = require("mongoose");

/**
 * GET: Ward list.
 */
router.get("/", async (req, res) => {
  try {
    let wards = await mongoose.model("wards").find();
    return success(res, "Success!", wards);
  } catch (err) {
    return errorProcess(res, err);
  }
});

/**
 * GET: Ward info by ID.
 */
router.get("/:id", async (req, res) => {
  try {
    let id = req.params.id;
    let ward = await mongoose.model("wards").findById(id);
    return success(res, "Success!", ward);
  } catch (err) {
    return errorProcess(res, err);
  }
});

module.exports = router;
