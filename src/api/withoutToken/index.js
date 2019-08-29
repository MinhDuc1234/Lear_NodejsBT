var router = require("express").Router();

router.use('/news', require('api/withoutToken/news'));
router.use('/exams', require('api/withoutToken/exams'));
router.use('/wards', require('api/withoutToken/wards'));
router.use('/activities', require('api/withoutToken/activities'));
router.use('/categories', require('api/withoutToken/categories'));

module.exports = router;