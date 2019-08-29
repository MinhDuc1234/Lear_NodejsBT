var mongoose = require('mongoose');
var uploadFile = require("services/uploadFile");
var { asyncForEach } = require('services/asyncFunction');
module.exports = router => {
    //insert exam
    router.post('/exams/create', async (req, res, next) => {
        try {
            let exams = await mongoose.model('exams').create({ ...req.body });
            return res.redirect(`/questions/${exams._id}/list`)
        } catch (err) {
            next(err)
        }
    })

    //insert question
    router.post('/exams/:examsId/questions', uploadFile.StoreFile().any(), async (req, res, next) => {
        try {
            let exams = await mongoose.model('exams').findById(req.params.examsId);
            let questionInfo;
            if (req.body.questionType == "TEXT" || req.body.questionType == "VIDEO") {
                const { question, questionType, answerQuestion, answer } = req.body
                questionInfo = await mongoose.model('questions').create({ question, questionType })
                await asyncForEach(answerQuestion, async (item, index) => {
                    let temp = await mongoose.model('answers').create({ text: item, questionsId: questionInfo._id })
                    questionInfo.answers.push(temp._id)
                    if (index == answer - 1) {
                        questionInfo.correctAnswer = temp._id;
                    }
                })

                await questionInfo.save();
                exams.questions.push(questionInfo._id)
            }
            else if (req.body.questionType == "IMAGE") {
                try {
                    const { questionType,answerQuestion ,answer} = req.body;
                    req.files[0].link = req.files[0].destination.substring(14, req.files[0].destination.length) + '/' + req.files[0].filename;
                    let question = req.files[0].link;
                    questionInfo = await mongoose.model('questions').create({ question, questionType });

                    await asyncForEach(answerQuestion, async (item, index) => {
                        let temp = await mongoose.model('answers').create({ text: item, questionsId: questionInfo._id })
                        questionInfo.answers.push(temp._id);
                        if (index == answer - 1) {
                            questionInfo.correctAnswer = temp._id;
                        }
                    })
    
                    await questionInfo.save();
                    exams.questions.push(questionInfo._id)
                } catch (error) {
                    console.log(err.message);
                    throw err;
                }
            }

            await exams.save();
            return res.redirect(`/questions/${req.params.examsId}/list`)

        } catch (err) {
            next(err)
        }
    });

    //update question
    router.post('/exams/:examsId/questions/:questionId', uploadFile.StoreFile().any(), async (req, res, next) => {
        let newQuestionWillBeInsert={
            answers:[],
            question:'',
            questionType:null,
            correctAnswer:null
        }
        let oldQuestion=await mongoose.model('questions').findById(req.params.questionId);
        try {
            if (req.body.questionType == "TEXT" || req.body.questionType=='VIDEO'){
                const { questionType,answerQuestion ,answer,question} = req.body;
                await asyncForEach(answerQuestion, async (item, index) => {
                    let temp = await mongoose.model('answers').create({ text: item, questionsId: oldQuestion._id })
                    newQuestionWillBeInsert.answers.push(temp._id)
                    if (index == answer - 1) {
                        newQuestionWillBeInsert.correctAnswer = temp._id;
                    }
                })
                newQuestionWillBeInsert.question=question;
                newQuestionWillBeInsert.questionType=questionType;
            }
            else if(req.body.questionType=='IMAGE'){
                const { questionType, answerQuestion, answer } = req.body;
                req.files[0].link = req.files[0].destination.substring(14, req.files[0].destination.length) + '/' + req.files[0].filename;
                newQuestionWillBeInsert.question = req.files[0].link;
                newQuestionWillBeInsert.questionType = questionType;
                await asyncForEach(answerQuestion, async (item, index) => {
                    let temp = await mongoose.model('answers').create({ text: item, questionsId: oldQuestion._id })
                    newQuestionWillBeInsert.answers.push(temp._id);
                    if (index == answer - 1) {
                        newQuestionWillBeInsert.correctAnswer = temp._id;
                    }
                })
                console.log("TCL: newQuestionWillBeInsert", newQuestionWillBeInsert)
            }
            await mongoose.model('questions').findByIdAndUpdate(req.params.questionId,newQuestionWillBeInsert);
            return res.redirect(`/questions/${req.params.examsId}/list`)
        } catch (error) {
            
        }
    });
}