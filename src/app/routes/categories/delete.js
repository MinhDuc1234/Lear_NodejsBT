var mongoose = require('mongoose');

module.exports = router => {
    router.delete('/:id', async (req, res, next) => {
        try {
            await mongoose.model('categories').findByIdAndDelete(req.params.id);
            return res.redirect('/categories')
        } catch (err) {
            next(err);
        }
    })
}