var express = require('express');
var Autenticacion = require('../helper/autenticacion');
var cita = require('../model/cita');
var auth = new Autenticacion();
var router = express.Router();

router.get('/api/cita/', function(req, res) {
  //auth.autorizar(req);
  //if(auth.getAcceso()) {
  var cookie = req.cookies;
    cita.selectAll(cookie.idUsuario, function(error, resultados){
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

router.get('/api/cita/:idCita',
  function(req, res) {
    var idCita = req.params.idCita;
    cita.select(idCita,
      function(error, resultados){
      if(typeof resultados !== undefined) {
        res.json(resultados);
      } else {
        res.json({"Mensaje": "No hay tareas"});
      }
  });
});

router.post('/api/cita', function(req, res) {
  var cookie = req.cookies;
  var data = {
    idCita : null,
    descripcion: req.body.descripcion,
    fecha: req.body.fecha,
    hora: req.body.hora,
    lugar: req.body.lugar,
    idUsuario: cookie.idUsuario
  }
  cita.insert(data, function(err, resultado) {
    if(resultado && resultado.insertId > 0) {
      res.redirect('/api/cita');
    } else {
      res.json({"Mensaje": "No se ingreso la tarea"});
    }
  });
});

router.put('/api/cita/:idCita', function(req, res) {
  var idCita = req.params.idCita;
  console.log(idCita);
  var data = {
    idCita : req.body.idCita,
    descripcion: req.body.descripcion,
    fecha: req.body.fecha,
    hora: req.body.hora,
    lugar: req.body.lugar,
    idUsuario: req.body.idUsuario
  }
  console.log(data.idCita);

  //if(data.idCategoria === idCategoria) {
    cita.update(data, function(err, resultado) {
      if(resultado !== undefined) {
        res.json(resultado);
      } else {
        res.json({"Mensaje": "No se modifico la cita"});
      }
    });
  /*} else {
    res.json({"Mensaje": "No concuerdan los datos"});
  }*/
});

router.delete('/api/cita/:idCita',
  function(req, res) {
    var idCita = req.params.idCita;
    console.log(idCita);
    cita.delete(idCita,
      function(error, resultado){
      if(resultado && resultado.Mensaje === "Eliminado") {
        res.redirect("/api/cita");
      } else {
        res.json({"Mensaje": "No se puede eliminar"});
      }
  });
});


module.exports = router;
