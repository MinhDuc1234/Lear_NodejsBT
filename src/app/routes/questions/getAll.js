var mongoose = require('mongoose');
var { success, errorWithMess} = require('services/returnToUser')
module.exports = router => {
    router.get('/', async (req, res, next) => {
        try {
            let exams = await mongoose.model('exams').find();
            return res.render('questions/index', { exams })
        } catch (err) {
            next(err)
        }
    });

    router.get('/:examsId/list', async (req, res, next) => {
        try {
            let exams = await mongoose.model('exams').findById(req.params.examsId).populate('questions');
            return res.render('questions/questions', { exams })
        } catch (err) {
            next(err);
        }
    })

    router.get('/:id', async (req, res, next) => {
        try {
            let question = await mongoose.model('questions').findById(req.params.id).populate(['answers', 'correctAnswer'])
            return success(res, "done", question)
        } catch (err) {
            return errorWithMess(res, err)
        }
    })
}