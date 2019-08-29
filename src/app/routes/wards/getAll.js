var mongoose = require('mongoose');
var { success, errorWithMess} = require('services/returnToUser')
module.exports = router => {
    router.get('/', async (req, res, next) => {
        try {
            let wards = await mongoose.model('wards').find();
            return res.render('wards/index', { wards })
        } catch (err) {
            next(err)
        }
    });

    router.get('/:id', async (req, res, next) => {
        try {
            let wards = await mongoose.model('wards').findById(req.params.id)
            return success(res, "done", wards)
        } catch (err) {
            return errorWithMess(res, err)
        }
    })
}