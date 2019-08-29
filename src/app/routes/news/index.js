var router = require("express").Router();
var uploadFile = require("services/uploadFile");
var NewsController = require('./newsController');
require('./getAll')(router);

//api routes
router.route('/api/:news_id')
    .get(NewsController.getById)
    .delete(NewsController.delete);

//handle insert
router.post('/', uploadFile.StoreFile().any(), async (req, res) => {
    try {
        req.files[0].link = req.files[0].destination.substring(14, req.files[0].destination.length) + '/' + req.files[0].filename;
        req.body.imageLink = req.files[0].link;
        console.log('req body in insert');
        console.log(req.body);
        await NewsController.insertRender(req, res);
    } catch (error) {
        await NewsController.insertRender(req, res);
    }

});

//handle update
router.post('/update/:news_id', uploadFile.StoreFile().any(), async (req, res) => {
    try {
        req.files[0].link = req.files[0].destination.substring(14, req.files[0].destination.length) + '/' + req.files[0].filename;
        req.body.imageLink = req.files[0].link;
        console.log(req.body);
        await NewsController.update(req, res);
    } catch (error) {
        req.body.imageLink='';
        await NewsController.update(req, res);
    }

})
module.exports = router;