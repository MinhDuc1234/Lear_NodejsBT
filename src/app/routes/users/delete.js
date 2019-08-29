var mongoose = require('mongoose');

module.exports = router => {
    router.delete('/:id', async (req, res, next) => {
        try {
            await mongoose.model('users').findByIdAndDelete(req.params.id);
            return res.redirect('/users')
        } catch (err) {
            next(err);
        }
    })

}