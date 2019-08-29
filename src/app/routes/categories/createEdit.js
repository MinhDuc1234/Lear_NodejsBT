var mongoose = require('mongoose');
module.exports = router => {
    router.post('/', async (req, res, next) => {
        try {
            let exams = await mongoose.model('categories').create({ ...req.body });
            return res.redirect(`/categories`)
        } catch (err) {
            next(err)
        }
    })

    router.post('/:id', async (req, res, next) => {
        try {
            let exams = await mongoose.model('categories').findByIdAndUpdate(req.params.id, { ...req.body });
            return res.redirect(`/categories`)
        } catch (err) {
            next(err)
        }
    })    
}