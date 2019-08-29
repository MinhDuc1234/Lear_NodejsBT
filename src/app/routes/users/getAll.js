var mongoose = require('mongoose');
var { success, errorWithMess } = require('services/returnToUser')
module.exports = router => {
    router.get('/', async (req, res, next) => {
        try {
            let users = await mongoose.model('users').find();
            console.log(users)
            return res.render('users/index', { users })
        } catch (err) {
            next(err)
        }
    });

    router.get('/:id', async (req, res, next) => {
        try {
            let users = await mongoose.model('users').findById(req.params.id);
            return success(res, "done", users)
        } catch (err) {
            return errorWithMess(res, err)
        }
    })
}