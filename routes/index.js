var express = require('express');
var Autenticacion = require('../helper/autenticacion');
var router = express.Router();
var auth = new Autenticacion();

router.get('/', function(req, res, next) {
  auth.autorizar(req);
  res.render(auth.getPath() + 'index');
});

router.get('/autenticar', function(req, res, next) {
  res.render('default/autenticar');
});

router.get('/registrar', function(req, res, next) {
  res.render('default/registrar');
});

router.get('/vistaContacto', function(req, res, next){
  res.render('dashboard/vistaContacto');
});

router.get('/vistaCategoria', function(req, res, next){
  res.render('dashboard/vistaCategoria');
});

router.get('/vistaTarea', function(req, res, next){
  res.render('dashboard/vistaTarea');
});

router.get('/vistaCita', function(req, res, next){
  res.render('dashboard/vistaCita');
});

router.get('/cerrar', function(req, res) {
  res.clearCookie('idUsuario');
  res.clearCookie('nick');
  res.redirect('/');
});

module.exports = router;
