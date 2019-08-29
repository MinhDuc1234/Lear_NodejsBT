var router = require("express").Router();

require('./getAll')(router);
require('./exameCreate')(router);
require('./delete')(router);

module.exports = router;