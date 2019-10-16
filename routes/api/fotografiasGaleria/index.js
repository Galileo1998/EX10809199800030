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
             res.json(newFotografias);  
           }
         }
       );
    } else {
      res.status(400).json({"error":"No se pudo ingresar objeto"});
    }
 }); 

 router.put('/update/:fotoID',
 function(req, res){
     fotoCollection = fileModel.getFotografias();
     var fotoCodigoModify = req.params.fotoID;
     var newUrl = req.body.url;
     var newThumbnailUrl = req.body.thumbnailUrl;
     var modFotografias = {};
     var newFotografiasArray = fotoCollection.map(
       function(o,i){
         if( fotoCodigoModify === o.id){
            o.url = newUrl;
            o.thumbnailUrl = newThumbnailUrl;
            modFotografias = Object.assign({}, o);
         }
         return o;
       }
     ); // end map
   fotoCollection = newFotografiasArray;
   fileModel.setFotografias(
     fotoCollection,
     function (err, savedSuccesfully) {
       if (err) {
         res.status(400).json({ "error": "No se pudo actualizar objeto" });
       } else {
         res.json(modFotografias);
       }
     }
   );
 }
);

router.delete(
    '/delete/:fotoID',
    function( req, res) {
      fotoCollection = fileModel.getFotografias();
      var fotoCodigoToDelete  = req.params.fotoID;
      var newFotoCollection = fotoCollection.filter(
        function(o, i){
          return fotoCodigoToDelete !== o.id;
        }
      ); //filter
      fotoCollection = newFotoCollection;
      fileModel.setFotografias(
        fotoCollection,
        function (err, savedSuccesfully) {
          if (err) {
            res.status(400).json({ "error": "No se pudo eliminar objeto" });
          } else {
            res.json({"newProdsQty": fotoCollection.length});
          }
        }
      );
    }
  );// delete

module.exports = router;