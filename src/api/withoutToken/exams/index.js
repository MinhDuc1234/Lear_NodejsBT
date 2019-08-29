const {DEFAULT_LIMIT_DATA_PER_REQUEST} = require('config/constants');
const {errorProcess, success, successWithNoData} = require('services/returnToUser')
var router = require("express").Router();
var mongoose = require('mongoose');

/**
 * GET: exams list. 
 * This API included pagination
 */
router.get('/', async (req, res, next) => {
  try {
    let page = parseInt(req.query.page) || 1;
    let limit = DEFAULT_LIMIT_DATA_PER_REQUEST;
    let skip  = (page - 1) * DEFAULT_LIMIT_DATA_PER_REQUEST;
  
    let exams = await mongoose.model('exams')
                .find().skip(skip).limit(limit)
                .select(["name", "description"]);
    
    return success(res, null, exams);    
  } catch (err) {
    return errorProcess(res, err);
  }  
});

/**
 * GET: Find exam by id.
 */
router.get('/:id', async (req, res, next) => {
  try {
    let id = req.params.id;

    let exam = await mongoose.model('exams').aggregate([
        { $match: {_id: mongoose.Types.ObjectId(id) }},
        { $lookup: {
            from: 'questions',
            localField: 'questions',
            foreignField: '_id',
            as: 'questions'
        }}, 
        { $unwind: { path: "$questions", preserveNullAndEmptyArrays: true }},
        { $project: {
            name: 1,
            "questions._id": 1,
            "questions.answers": 1,
            "questions.question": 1,
            "questions.questionType": 1
        }},
        { $lookup: {
            from: 'answers',
            localField: 'questions.answers',
            foreignField: '_id',
            as: 'questions.answers'
        }}, 
        { $group: {
            _id: "$_id",
            name: { $first: "$name" },
            questions: { $push: "$questions"}
        }}
      ]);

    return success(res, null, exam);
  } catch (err) {
    return errorProcess(res, err);
  }
});

/**
 * POST: Submit exams answer.
 * 
 * @param req.params.id: Exams ID
 * @param req.body.data: Answers result - Format: [{answer: ..., question: ...}]
 */
router.post('/:examsId/wards/:wardId/', async (req, res) => {
  try {
    let id = req.params.examsId;
    let wardId = req.params.wardId;
    let answers = req.body.data;

    let examResponse = {
      ward: wardId,
      exam: id,
      answers: [
        ...JSON.parse(answers)
      ]
    }
    
    // Save submit to database.
    let examResponsesSaved = await mongoose.model('examResponses').create(examResponse);

    // Caculate number of Correct Answers/number of Question responsed.
    let returnToUserData = await mongoose.model('examResponses').aggregate([
        { $match: {_id: mongoose.Types.ObjectId(examResponsesSaved.id)}},
        { $unwind: {  path: "$answers", includeArrayIndex: "true"}}, 
        { $lookup: {
          from: 'questions',
          localField: 'answers.question',
          foreignField: '_id',
          as: 'question'
        }},
        { $unwind: { path: "$question" , includeArrayIndex: "true"}}, 
        { $project: { isCorrect: { $eq: ["$answers.answer", "$question.correctAnswer"] } }}, 
        { $group: {
          _id: "$_id",
          numberCorrect: {
            $sum: {
              $switch: {
                branches: [ {case: { $eq: ['$isCorrect', true]}, then: 1}],
                default: 0
              }
            }
          },
          totalResponseQuestion: { $sum: 1 }
        }}
      ]);

    examResponsesSaved.numberCorrect = returnToUserData.length <= 0 ? 0 
    : returnToUserData[0].numberCorrect;

    await examResponsesSaved.save();
      
    return success(res, "Success!", returnToUserData[0]);
  } catch (err) {
    console.log(err);
    return errorProcess(res, err);
  }
});



module.exports = router;