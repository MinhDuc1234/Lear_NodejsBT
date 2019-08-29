var router = require("express").Router();

require('./logout')(router);
require('./edit')(router);
require('./getAll')(router);
require('./create')(router);
require('./delete')(router);

module.exports = router;