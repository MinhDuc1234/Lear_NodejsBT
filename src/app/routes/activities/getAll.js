var mongoose = require('mongoose');

module.exports = router => {
    router.get('/', async (req, res, next) => {
        try {
            let activities = 
            await mongoose.model('activities').find().
                populate({
                    path: 'createdBy',
                    select: 'username'
                }).
                populate({
                    path: 'updatedBy',
                    select: 'username'
                }).
                exec();
            console.log('activities outside');
            console.log(activities);
            return res.render('activities/index', { activities })
        } catch (err) {
            console.log('some err');
            console.log(err);
            next(err)
        }
    })
}