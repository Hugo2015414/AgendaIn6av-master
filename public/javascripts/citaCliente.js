var ViewModel = function () {
	var main = this;
	var citaUri = 'http://localhost:3000/api/cita';
	main.citas = ko.observableArray();
	main.error = ko.observable();
	main.citaCargada = ko.observable();
	main.citaNueva = {
    descripcion: ko.observable(),
    fecha: ko.observable(),
    hora: ko.observable(),
    lugar:ko.observable()
	}

	main.cargar = function (item) {
		console.log(JSON.stringify(item));
		main.citaCargada(item);
	}

	main.editar = function (formElement) {
		var citaEditada = {
			idCita: main.citaCargada().idCita,
			descripcion: main.citaCargada().descripcion,
      fecha: main.citaCargada().fecha,
      hora: main.citaCargada().hora,
      lugar: main.citaCargada().lugar
		}
		var uri = citaUri + '/' + citaEditada.idCita;
		ajaxHelper(uri, 'PUT', citaEditada)
			.done(function (data) {
				getAllCitas();
				$("#modalEditar").modal('hide');
			})
	}

	main.eliminar = function (item) {
		var id = item.idCita;
		var uri = citaUri +  '/' + id;
		ajaxHelper(uri, 'DELETE').done(function () {
			getAllCitas();
		});
	}

	main.agregar = function (formElement) {
		var cita = {
      descripcion: main.citaNueva.descripcion(),
      fecha: main.citaNueva.fecha(),
      hora: main.citaNueva.hora(),
      lugar: main.citaNueva.lugar()
		}
		console.log(cita)
		ajaxHelper(citaUri, 'POST', cita)
			.done(function (data) {
				getAllCitas();
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

  function getAllCitas() {
		ajaxHelper(citaUri, 'GET')
			.done(function (data) {
				main.citas(data);
			});
	}

  getAllCitas();
}

$(document).ready(function () {
	var viewModel = new ViewModel();
	ko.applyBindings(viewModel);

	$(".btn-guardar").click(function () {
		console.log("hola");
		var form = $("#form-cita");
		viewModel.agregar(form);
	});
});
