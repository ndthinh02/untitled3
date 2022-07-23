var express = require('express');
var router = express.Router();
var fs = require('fs');
var multer = require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    }
})

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});
router.get('/getUser', function (req, res) {
    fs.readFile('public/data.txt', function (err, data) {
        if (err != null) {
            res.send(err.message);
        } else {
            var text = data;
            var myArr = JSON.parse(text)
            res.send(myArr);
        }
    })
})
var upload = multer({storage: storage});
router.post('/createUser', upload.single('avatar'), function (req, res) {
    var email = req.body.email
    var pass = req.body.pass;
    var data = {
        email: undefined,
        pass: undefined,
        avatar: undefined,
        urlAvatar: undefined
    }
    data.email = email;
    data.pass = pass;

    data.avatar = req.file.originalname
    data.urlAvatar = req.file.path;
    res.send(data);
})


module.exports = router;
