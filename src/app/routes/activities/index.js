var router = require("express").Router();
var ActivitiesController = require('./activitiesController');
require('./getAll')(router);

//api routes
router.route('/api')
    .get(ActivitiesController.getAll)
    .post(ActivitiesController.insert);

router.route('/api/:activities_id')
    .get(ActivitiesController.getById)
    .put(ActivitiesController.update)
    .delete(ActivitiesController.delete);

router.route('/api/qrcode/:id')
    .get(ActivitiesController.getQR);


//update activity page 
router.get('/edit/:id',function(req,res){
    var id=req.params.id;
    res.render('activities/edit',{id});
});

//insert activity page
router.get('/insert',function(req,res){
    res.render('activities/insert');
})

module.exports = router;