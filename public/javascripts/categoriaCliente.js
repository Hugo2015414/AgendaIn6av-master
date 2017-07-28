var ViewModel = function () {
	var main = this;
	var categoriaUri = 'http://localhost:3000/api/categoria/';
	main.categorias = ko.observableArray();
	main.error = ko.observable();
	main.categoriaCargada = ko.observable();
	main.categoriaNueva = {
    nombreCategoria: ko.observable()
	}

	main.cargar = function (item) {
		console.log(JSON.stringify(item));
		main.categoriaCargada(item);
	}

	main.editar = function (formElement) {
		var categoriaEditada = {
			idCategoria: main.categoriaCargada().idCategoria,
			nombreCategoria: main.categoriaCargada().nombreCategoria
		}
		var uri = categoriaUri + categoriaEditada.idCategoria;
		ajaxHelper(uri, 'PUT', categoriaEditada)
			.done(function (data) {
				console.log(JSON.stringify(data));
				getAllCategorias();
				$("#modalEditar").modal('hide');
			})
	}

	main.eliminar = function (item) {
		var id = item.idCategoria;
		var uri = categoriaUri + id;
		ajaxHelper(uri, 'DELETE').done(function () {
			getAllCategorias();
		});
	}

	main.agregar = function (formElement) {
		var categoria = {
      nombreCategoria: main.categoriaNueva.nombreCategoria(),
		}
		console.log(categoria);
		ajaxHelper(categoriaUri, 'POST', categoria)
			.done(function (data) {
				getAllCategorias();
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

  function getAllCategorias() {
		ajaxHelper(categoriaUri, 'GET')
			.done(function (data) {
				main.categorias(data);
			});
	}

  getAllCategorias();
}

$(document).ready(function () {
	var viewModel = new ViewModel();
	ko.applyBindings(viewModel);

	$(".btn-guardar").click(function () {
		console.log("hola");
		var form = $("#form-categoria");
		viewModel.agregar(form);
	});
});
