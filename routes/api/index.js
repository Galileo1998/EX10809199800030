var express = require('express');
var router = express.Router();

//Rutas de Cada Entidad
var fotografiasApiRouter = require('./fotografiasGaleria/index');


//localhost:3000/api/foto/
router.use('/foto', fotografiasApiRouter);


module.exports = router;
