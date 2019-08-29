var mongoose = require('mongoose');

module.exports = router => {
    router.get('/', async (req, res, next) => {
        try {
            let news = await mongoose.model('news').find().
                populate({
                    path: 'createdBy',
                    select: 'username'
                }).
                populate({
                    path: 'updatedBy',
                    select: 'username'
                }).
                sort({ createdDate: -1 }).
                exec();
            let categories = await mongoose.model('categories').find()
            return res.render('news/index', { news, categories })
        } catch (err) {
            console.log('some err');
            console.log(err);
            next(err)
        }
    })
}