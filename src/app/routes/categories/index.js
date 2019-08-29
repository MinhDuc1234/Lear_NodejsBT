var router = require("express").Router();

require('./getAll')(router);
require('./delete')(router);
require('./createEdit')(router);

module.exports = router;