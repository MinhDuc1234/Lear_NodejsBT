var mongoose = require('mongoose');
module.exports = router => {
    router.post('/', async (req, res, next) => {
        try {
            await mongoose.model('wards').create({ ...req.body });
            return res.redirect(`/wards`)
        } catch (err) {
            next(err)
        }
    })

    router.post('/:id', async (req, res, next) => {
        try {
            await mongoose.model('wards').findByIdAndUpdate(req.params.id, { ...req.body });
            return res.redirect(`/wards`)
        } catch (err) {
            next(err)
        }
    })    
}