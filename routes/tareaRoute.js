var express = require('express');
var Autenticacion = require('../helper/autenticacion');
var tarea = require('../model/tarea');
var auth = new Autenticacion();
var router = express.Router();

router.get('/api/tarea/', function(req, res) {
  //auth.autorizar(req);
  //if(auth.getAcceso()) {
  var cookie = req.cookies;
    tarea.selectAll(cookie.idUsuario, function(error, resultados){
      if(typeof resultados !== undefined) {
        res.json(resultados);
      } else {
        res.json({"Mensaje": "No hay tareas"});
      }
    });
  /*} else {
    res.redirect('default/autenticar');
  }*/
});

router.get('/api/tarea/:idTarea',
  function(req, res) {
    var idTarea = req.params.idTarea;
    tarea.select(idTarea,
      function(error, resultados){
      if(typeof resultados !== undefined) {
        res.json(resultados);
      } else {
        res.json({"Mensaje": "No hay tareas"});
      }
  });
});

router.post('/api/tarea', function(req, res) {
  var cookie = req.cookies;
  var data = {
    idTarea : null,
    descripcion: req.body.descripcion,
    fecha: req.body.fecha,
    idUsuario: cookie.idUsuario
  }
  tarea.insert(data, function(err, resultado) {
    if(resultado && resultado.insertId > 0) {
      res.redirect('/api/tarea');
    } else {
      res.json({"Mensaje": "No se ingreso la tarea"});
    }
  });
});

router.put('/api/tarea/:idTarea', function(req, res) {
  var idTarea = req.params.idTarea;
  console.log(idTarea);
  var data = {
    idTarea : req.body.idTarea,
    descripcion: req.body.descripcion,
    fecha: req.body.fecha
  }
  console.log(data.idTarea);

  //if(data.idCategoria === idCategoria) {
    tarea.update(data, function(err, resultado) {
      if(resultado !== undefined) {
        res.json(resultado);
      } else {
        res.json({"Mensaje": "No se modifico la tarea"});
      }
    });
  /*} else {
    res.json({"Mensaje": "No concuerdan los datos"});
  }*/
});

router.delete('/api/tarea/:idTarea',
  function(req, res) {
    var idTarea = req.params.idTarea;
    console.log(idTarea);
    tarea.delete(idTarea,
      function(error, resultado){
      if(resultado && resultado.Mensaje === "Eliminado") {
        res.redirect("/api/tarea");
      } else {
        res.json({"Mensaje": "No se puede eliminar"});
      }
  });
});


module.exports = router;
