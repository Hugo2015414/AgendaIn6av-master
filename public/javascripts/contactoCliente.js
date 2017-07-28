var ViewModel = function () {
	var main = this;
	var contactoUri = 'http://localhost:3000/api/contacto';
	var categoriaUri = 'http://localhost:3000/api/categoria';
	main.contactos = ko.observableArray();
	main.categorias = ko.observableArray();
	main.error = ko.observable();
	main.contactoCargado = ko.observable();
	main.contactoNuevo = {
    nombre: ko.observable(),
		apellido: ko.observable(),
		direccion: ko.observable(),
		telefono: ko.observable(),
		correo: ko.observable(),
	}
  main.categoriaDeContacto = {
    categoria: ko.observable()
  }

	main.cargar = function (item) {
		console.log(JSON.stringify(item));
		main.contactoCargado(item);
	}

	main.editar = function (formElement) {
		var contactoEditado = {
			idContacto: main.contactoCargado().idContacto,
			nombre: main.contactoCargado().nombre,
			apellido: main.contactoCargado().apellido,
			direccion: main.contactoCargado().direccion,
			telefono: main.contactoCargado().telefono,
			correo: main.contactoCargado().correo,
			idCategoria: main.contactoCargado().categoria.idCategoria
		}
		var uri = contactoUri + '/' + contactoEditado.idContacto;
		ajaxHelper(uri, 'PUT', contactoEditado)
			.done(function (data) {
				getAllContactos();
				$("#modalEditar").modal('hide');
			})
	}
	main.eliminar = function (item) {
		var id = item.idContacto;
		var uri = contactoUri +  '/' + id;
		ajaxHelper(uri, 'DELETE').done(function () {
			getAllContactos();
		});
	}

	main.agregar = function (formElement) {
		var contacto = {
      nombre: main.contactoNuevo.nombre(),
			apellido: main.contactoNuevo.apellido(),
			direccion: main.contactoNuevo.direccion(),
			telefono: main.contactoNuevo.telefono(),
			correo: main.contactoNuevo.correo(),
			idCategoria: main.categoriaDeContacto.categoria().idCategoria
		}
		console.log(contacto)
		ajaxHelper(contactoUri, 'POST', contacto)
			.done(function (data) {
				getAllContactos();
				$("#modalAgregar").modal('hide');
			});
	}

	function ajaxHelper(uri, method, data) {
		main.error('');
		return $.ajax({
			url: uri,
			type: method,
			dataType: 'json',
			contentType: 'application/json',
			data: data ? JSON.stringify(data) : null
		}).fail(function (jqXHR, textStatus, errorThrown) {
			main.error(errorThrown);
		});
	}

	function getAllContactos() {
		ajaxHelper(contactoUri, 'GET')
			.done(function (data) {
				main.contactos(data);
			});
	}

  function getAllCategorias() {
		ajaxHelper(categoriaUri, 'GET')
			.done(function (data) {
				main.categorias(data);
			});
	}

	getAllContactos();
  getAllCategorias();
}

$(document).ready(function () {
	var viewModel = new ViewModel();
	ko.applyBindings(viewModel);

	$(".btn-guardar").click(function () {
		console.log("hola");
		var form = $("#form-contacto");
		viewModel.agregar(form);
	});
});
