var express = require('express');
var Autenticacion = require('../helper/autenticacion');
var contacto = require('../model/contacto');
var auth = new Autenticacion();
var router = express.Router();

router.get('/api/contacto/', function(req, res) {
  auth.autorizar(req);
  if(auth.getAcceso()) {
    contacto.selectAll(auth.getIdUsuario(), function(error, resultados){
      if(typeof resultados !== undefined) {
        res.json(resultados);
      } else {
        res.json({"Mensaje": "No hay contactos"});
      }
    });
  } else {
    res.redirect('default/autenticar');
  }
});

router.get('/api/contacto/:idContacto',
  function(req, res) {
    var idContacto = req.params.idContacto;
    contacto.select(idContacto, function(error, resultados){
      if(typeof resultados !== undefined) {
        res.json(resultados);
      } else {
        res.json({"Mensaje": "No hay contactos"});
      }
  });
});

router.post('/api/contacto', function(req, res) {
  var cookie = req.cookies;
  var data = {
    idContacto : null,
    nombre: req.body.nombre,
    apellido: req.body.apellido,
    direccion: req.body.direccion,
    telefono: req.body.telefono,
    correo: req.body.correo,
    idCategoria: req.body.idCategoria,
    idUsuario: cookie.idUsuario
  }
  console.log(data);
  contacto.insert(data, function(err, resultado) {
    if(resultado && resultado.insertId > 0) {
      res.redirect('/api/contacto');
    } else {
      res.json({"Mensaje": "No se ingreso la contacto"});
    }
  });
});

router.put('/api/contacto/:idContacto', function(req, res) {
  var idContacto = req.params.idContacto;
  var data = {
    idContacto : req.body.idContacto,
    nombre: req.body.nombre,
    apellido: req.body.apellido,
    direccion: req.body.direccion,
    telefono: req.body.telefono,
    correo: req.body.correo,
    idCategoria: req.body.idCategoria
  }
  console.log(idContacto);
  console.log(data.idContacto);
  //if(idContacto === data.idContacto) {
    contacto.update(data, function(err, resultado) {
      if(resultado !== undefined) {
        res.json(resultado);
      } else {
        res.json({"Mensaje": "No se modifico la contacto"});
      }
    });
  /*} else {
    res.json({"Mensaje": "No concuerdan los datos"});
  }*/
});

router.delete('/api/contacto/:idContacto', function(req, res) {
    var idContacto = req.params.idContacto;

    contacto.delete(idContacto, function(error, resultado){
      if(resultado && resultado.Mensaje === "Eliminado") {
        res.redirect("/api/contacto");
      } else {
        res.json({"Mensaje": "No se puede eliminar"});
      }
  });
});


module.exports = router;
