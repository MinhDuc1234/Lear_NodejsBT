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

    let activities = await mongoose.model("activities").find().skip(skip).limit(limit)
                      .populate({path: 'createdBy', select: 'fullname position'})
                      .select(["name", "createdDate", "createdBy"]);

    return success(res, "Success!", activities);
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
    let activities = await mongoose.model("activities").findById(id)
                      .populate({path: 'createdBy', select: 'fullname position'})
                      .select(["name", "createdDate", "createdBy"]);

    return success(res, "Success!", activities);
  } catch (err) {
    return errorProcess(err);
  }
});

/**
 * POST: Add ward joined activities.
 */
router.post('/', async (req, res) => {
  try {
    let activitId = req.body.id;
    let wardId = req.body.wardId;
    let name = req.body.name;
    let activity = await mongoose.model('activities').findById(activitId);
    let ward = await mongoose.model('wards').findById(wardId);

    if (_.isEmpty(activity) || _.isEmpty(ward)) {
      return errorWithMess(res, "wardId or id invalid!");
    }

    // Find activitiesJoined object
    var activitiesJoined = await mongoose.model('activitiesJoined').findOne({ activity: activitId });

    // Nobody joined this activity yet.
    if (_.isEmpty(activitiesJoined)) {
      //Create new activitiesJoined.
      activitiesJoined = await mongoose.model('activitiesJoined').create({ activity: activitId });
      // Add wardJoined.
      activitiesJoined.wardJoined.push({ ward: wardId,  numberJoined: 1, userJoined: [name] });
      
      await activitiesJoined.save();

    } else { // Had person join this activity before.

      // wardJoindedIndex = -1 => not exists ward 
      // wardJoindedIndex != -1 => wardJoindedIndex is index of wardJoined object in wardJoined array.
      var wardJoindedIndex = _.findIndex(activitiesJoined.wardJoined, item => { return (item.ward == wardId) });

      // Could not find ward in wardJoined.
      if (wardJoindedIndex == -1) {
        // activitiesJoined.wardJoined.push({ ward: wardId, numberJoined: 1 });
        activitiesJoined.wardJoined.push({ ward: wardId,  numberJoined: 1, userJoined: [name] });
        await activitiesJoined.save();
      } else {
        // The case wardJoindedIndex != -1 => update numberJoined.
        activitiesJoined.wardJoined[wardJoindedIndex].numberJoined += 1;
        activitiesJoined.wardJoined[wardJoindedIndex].userJoined.push(name);
        await activitiesJoined.save();
      }
    }

    return success(res, "Success!", null);
  } catch (err) {
    
    return errorProcess(err);
  }
});
module.exports = router;
