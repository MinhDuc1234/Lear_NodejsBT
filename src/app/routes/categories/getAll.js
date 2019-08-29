var mongoose = require('mongoose');
var { success, errorWithMess} = require('services/returnToUser')
module.exports = router => {
    router.get('/', async (req, res, next) => {
        try {
            let categories = await mongoose.model('categories').find();
            console.log(categories)
            return res.render('category/index', { categories })
        } catch (err) {
            next(err)
        }
    });

    router.get('/:id', async (req, res, next) => {
        try {
            let question = await mongoose.model('categories').findById(req.params.id)
            return success(res, "done", question)
        } catch (err) {
            return errorWithMess(res, err)
        }
    })
}