var mongoose = require('mongoose');

module.exports = router => {
    router.delete('/exams/:examsId', async (req, res, next) => {
        try {
            await mongoose.model('exams').findByIdAndDelete(req.params.examsId);
            return res.redirect('/questions')
        } catch (err) {
            next(err);
        }
    })

    router.delete('/exams/:examsId/questions/:questionsId', async (req, res, next) => {
        try {
            await mongoose.model('questions').findByIdAndDelete(req.params.questionsId);
            let exams = await mongoose.model('exams').findById(req.params.examsId);
            exams.questions.map((item, index) => {
                if (item == req.params.questionsId) {
                    exams.questions.splice(index, 1)
                }
            })
            await exams.save();
            return res.redirect(`/questions/${req.params.examsId}/list`)
        } catch (err) {
            next(err);
        }
    })

}