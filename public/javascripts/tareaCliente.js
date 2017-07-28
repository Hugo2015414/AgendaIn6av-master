var ViewModel = function () {
	var main = this;
	var tareaUri = 'http://localhost:3000/api/tarea';
	main.tareas = ko.observableArray();
	main.error = ko.observable();
	main.tareaCargada = ko.observable();
	main.tareaNueva = {
    descripcion: ko.observable(),
    fecha: ko.observable()
	}

	main.cargar = function (item) {
		console.log(JSON.stringify(item));
		main.tareaCargada(item);
	}

	main.editar = function (formElement) {
		var tareaEditada = {
			idTarea: main.tareaCargada().idTarea,
			descripcion: main.tareaCargada().descripcion,
      fecha: main.tareaCargada().fecha
		}
		var uri = tareaUri + '/' + tareaEditada.idTarea;
		ajaxHelper(uri, 'PUT', tareaEditada)
			.done(function (data) {
				getAllTareas();
				$("#modalEditar").modal('hide');
			})
	}

	main.eliminar = function (item) {
		var id = item.idTarea;
		var uri = tareaUri +  '/' + id;
		ajaxHelper(uri, 'DELETE').done(function () {
			getAllTareas();
		});
	}

	main.agregar = function (formElement) {
		var tarea = {
      descripcion: main.tareaNueva.descripcion(),
      fecha: main.tareaNueva.fecha()
		}
		console.log(tarea)
		ajaxHelper(tareaUri, 'POST', tarea)
			.done(function (data) {
				getAllTareas();
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

  function getAllTareas() {
		ajaxHelper(tareaUri, 'GET')
			.done(function (data) {
				main.tareas(data);
			});
	}

  getAllTareas();
}

$(document).ready(function () {
	var viewModel = new ViewModel();
	ko.applyBindings(viewModel);

	$(".btn-guardar").click(function () {
		console.log("hola");
		var form = $("#form-tarea");
		viewModel.agregar(form);
	});
});
