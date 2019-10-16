var express = require('express');
var router = express.Router();

var fileModel = require('../filemodel');

var fotoCollection = fileModel.getFotografias();

router.get('/', function (req, res) {
  res.json({
    "entity": "Fotografías Galería",
    "version": "0.0.1"
  });
}); 


router.get('/all', function(req, res){
    conCollection = fileModel.getFotografias();
    res.json(conCollection);
  }); // get /all


module.exports = router;