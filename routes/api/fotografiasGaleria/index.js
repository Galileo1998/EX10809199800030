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
  }); 

router.post('/new', function(req, res){
    fotoCollection = fileModel.getFotografias();
    var newFotografias = Object.assign(
       {},
       req.body,
       {
           "title": req.body.title,
           "url": req.body.url,
           "thumbnailUrl": req.body.thumbnailUrl,
           "album": req.body.album
       }
    );
    var fotografiasExists = fotoCollection.find(
      function(o, i){
        return o.id === newFotografias.id;
      }
    )
    if( ! fotografiasExists ){
      fotoCollection.push(newFotografias);
      fileModel.setFotografias(
         fotoCollection,
         function(err, savedSuccesfully){
           if(err){
             res.status(400).json({ "error": "No se pudo ingresar objeto" });
           } else {
             res.json(newFotografias);  // req.body ===  $_POST[]
           }
         }
       );
    } else {
      res.status(400).json({"error":"No se pudo ingresar objeto"});
    }
 }); // post /new



module.exports = router;