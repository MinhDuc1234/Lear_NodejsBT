const {DEFAULT_LIMIT_DATA_PER_REQUEST} = require('config/constants');
const {errorProcess, success} = require('services/returnToUser')
var router = require("express").Router();
var mongoose = require('mongoose');

/**
 * Get all news (don't filter)
 */
router.get('/', async (req, res, next) => {

  try {
    let page = parseInt(req.query.page) || 1;
    let limit = DEFAULT_LIMIT_DATA_PER_REQUEST;
    let skip  = (page - 1) * DEFAULT_LIMIT_DATA_PER_REQUEST;

    let newsList = await mongoose.model('news').find()
        .populate({ path: 'createdBy', select: 'fullname position' })
        .skip(skip).limit(limit)
        .select(['title', 'createdBy', 'shortDescription', 'createdDate', 'imageLink']);

    return success(res, null, newsList);
  } catch (err) {
    return  errorProcess(res, err);
  }
  
});

router.get('/id/:id', async (req, res, next) => {
  try {
    let id = req.params.id;
    let news = await mongoose.model('news').findById(id)
    .populate({ path: 'createdBy', select: 'fullname position' })
    .populate({ path: 'category', select: 'title' });

    return success(res, null, news);
  } catch (err) {
    return errorProcess(res, err);
  }
});

router.get('/hot', async (req, res) => {
  try {
    let newsList = await mongoose.model('news').find()
      .populate({ path: 'createdBy', select: 'fullname position' })
      .sort({createdDate: -1}).skip(0).limit(5)
      .select(['title', 'createdBy', 'shortDescription', 'createdDate', 'imageLink']);
    return success(res, null, newsList);
  } catch (err) {
    return errorProcess(res, err);
  }
});

/**
 * Search news by keyword.
 */
router.get('/search/:keyword', async (req, res, next) => {
  try {
    let page = parseInt(req.query.page) || 1;
    let limit = DEFAULT_LIMIT_DATA_PER_REQUEST;
    let skip  = (page - 1) * DEFAULT_LIMIT_DATA_PER_REQUEST;
    let keyword = req.params.keyword;

    let news = await mongoose.model('news').find({ $text: { $search: keyword } })
        .populate({ path: 'createdBy', select: 'fullname position' })
        .skip(skip).limit(limit)
        .select(['title', 'createdBy', 'shortDescription', 'createdDate', 'imageLink']);

    return success(res, null, news);
  } catch (err) {
    errorProcess(res, err);
  }
});

/**
 * Get list of categories
 */
router.get('/categories', async (req, res, next) => {
  try {
    let categories = await mongoose.model('categories').find().select(['_id', 'title']);

    return success(res, null, categories);
  } catch (err) {
    return errorProcess(res, err);
  }
});

/**Get news by category Id.
 * @param req.page A query params - Number of page.
 * @param category Path parameter - categoryId
 * 
 * @returns pagination of news which filter by categories ID.
 */
router.get('/categories/:category', async (req, res, next) => {
  try {
    let category = req.params.category;
    let page = parseInt(req.query.page) || 1;
    let limit = DEFAULT_LIMIT_DATA_PER_REQUEST;
    let skip  = (page - 1) * DEFAULT_LIMIT_DATA_PER_REQUEST;

    let newsList = await mongoose.model('news').find({category: category})                    
                    .populate({path: 'createdBy', select: 'fullname position'})
                    .skip(skip).limit(limit)
                    .select(['title', 'createdBy', 'shortDescription', 'createdDate']);

    return success(res, null, newsList);
  } catch (err) {
    return errorProcess(res, err);
  }
});

module.exports = router;