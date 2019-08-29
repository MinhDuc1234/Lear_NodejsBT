var router = require("express").Router();
var passport = require("passport");
var session = require("express-session");
var bcrypt = require('bcryptjs');
var { success } = require('services/returnToUser');
var { checkPermission } = require('services/checkPermission');
var mongoose = require('mongoose');

router.get('/setup', async (req, res, next) => {
  // let insert = {
  //   username: "ducnm98",
  //   password: "123",
  //   roles: ["*"],
  //   fullname: "Nguyễn Minh Đức",
  //   position: "Chủ tịch"
  // }
  // const saltRounds = 10;
  //     bcrypt.hash(insert.password, saltRounds, async (err, hash) => {
  //       insert.password = hash;
  //       let usersInfo = await mongoose.model('users').create(insert)
  //       console.log(usersInfo)
  //     });
  let user = await mongoose.model('users').findOne({username: "ducnm98"});

  let category = await mongoose.model('categories').create({title: "Category Title"});

  return success(res, "Done");
})

router.use(
  session({
    name: "binh_thanh_management",
    proxy: true,
    resave: true,
    secret: "binh_thanh_management.secrect", // session secret
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false /*Use 'true' without setting up HTTPS will result in redirect errors*/
    }
  })
);

//PassportJS middleware
router.use(passport.initialize());
router.use(passport.session()); //persistent login sessions

require("config/passport")(passport);

router.use('/users/login', require('./users/login'))

router.use(checkPermission(["*"]));
router.use((req, res, next) => {
  res.locals.user = req.user;
  next()
})
router.use('/users', require('./users'));
router.use('/news', require('./news'));
router.use('/activities', require('./activities'));
router.use('/questions', require('./questions'));
router.use('/categories', require('./categories'));
router.use('/wards', require('./wards'))

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


module.exports = router;
