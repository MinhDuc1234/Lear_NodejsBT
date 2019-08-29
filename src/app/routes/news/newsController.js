var mongoose = require('mongoose');
var { success, errorProcess } = require('services/returnToUser');
var uploadFile = require("services/uploadFile");

//handle get all news
exports.getAll = async (req, res) => {
  try {
    let news = await mongoose.model('news').find().sort({ createdDate: 1 })
    return success(res, "Done", news)
  } catch (err) {
    return errorProcess(res, err)
  }
};

//handle insert new
exports.insertRender = async (req, res) => {
  try {
    let news = await mongoose.model('news').create({ ...req.body, createdBy: req.user._id });
    let update = {
      $push: {
        news: mongoose.Types.ObjectId(news._id)
      }
    }
    await mongoose.model('categories').findByIdAndUpdate(req.body.category, update)
    return res.redirect('/news')
  } catch (err) {
    return errorProcess(res, err)
  }
};

//handle get news by id
exports.getById = async (req, res) => {
  try {
    let news = await mongoose.model('news').findById(req.params.news_id).populate('category')
    return success(res, "Done", news)
  } catch (err) {
    return errorProcess(res, err)
  }
};

//hanle update
exports.update = async (req, res) => {
  try {
    console.log('id in update');
    console.log(req.params.news_id);
    let news = await mongoose.model('news').findByIdAndUpdate(req.params.news_id, { ...req.body })
    return res.redirect('/news')
  } catch (err) {
    return errorProcess(res, err)
  }
  
};

//handle delete
exports.delete = async (req, res) => {
  try {
    await mongoose.model('news').findByIdAndDelete(req.params.news_id);
    return success(res, "Done", null)
  } catch (err) {
    return errorProcess(res, err)
  }
};
