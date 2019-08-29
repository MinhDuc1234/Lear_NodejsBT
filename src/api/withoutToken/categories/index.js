const { DEFAULT_LIMIT_DATA_PER_REQUEST } = require("config/constants");
const { errorProcess, success, errorWithMess} = require("services/returnToUser");
var router = require("express").Router();
var mongoose = require("mongoose");
var _ = require('lodash');

/**
 * GET: find all activity info.
 */
router.get("/", async (req, res) => {
  try {
    // Pagination value.
    let page = parseInt(req.query.page) || 1;
    let limit = DEFAULT_LIMIT_DATA_PER_REQUEST;
    let skip  = (page - 1) * DEFAULT_LIMIT_DATA_PER_REQUEST;

    let categories = await mongoose.model("categories").find().skip(skip).limit(limit)
    return success(res, "Success!", categories);
  } catch (err) {
    return errorProcess(err);
  }
});

/**
 * GET: find activity by Id.
 */
router.get('/:id', async (req, res) => {
  try {
    let id = req.params.id;
    let categories = await mongoose.model("categories").findById(id).populate('news')
                      

    return success(res, "Success!", categories);
  } catch (err) {
    return errorProcess(err);
  }
});

module.exports = router;
