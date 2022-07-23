var express = require('express');
var router = express.Router();
var fs = require('fs');
var upload = require('multer');

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
router.post('/createUser',upload.single('avatar'),function (req,res){
    var email = req.body.email
    var pass = req.body.pass;
    var data = {
        email :undefined,
        pass :undefined,
        avatar:undefined,
        urlAvatar:undefined
    }
    data.email = email;
    data.pass = pass;

    data.avatar = req.file.originalname
    data.urlAvatar = req.file.path;
})


module.exports = router;
