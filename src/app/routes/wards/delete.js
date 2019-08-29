var mongoose = require('mongoose');

module.exports = router => {
    router.delete('/:id', async (req, res, next) => {
        try {
            await mongoose.model('wards').findByIdAndDelete(req.params.id);
            return res.redirect('/wards')
        } catch (err) {
            next(err);
        }
    })
}