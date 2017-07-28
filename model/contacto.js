var database = require('./database');
var contacto = {};

contacto.selectAll = function(idUsuario, callback) {
  if(database) {
    database.query("SELECT * FROM Contacto WHERE idUsuario = ?",
    idUsuario,
    function(error, resultados) {
      if(error) {
        throw error;
      } else {
        callback(null, resultados);
      }
    });//Fin query
  }//Fin IF
}//FIN SelectAll

contacto.select = function(idContacto, callback) {
  if(database) {
    var sql = "SELECT * FROM Contacto WHERE idContacto = ?";
    database.query(sql, idContacto,
    function(error, resultado) {
      if(error) {
        throw error;
      } else {
        callback(null, resultado);
      }
    });//Fin query
  }//Fin IF
}//FIN SelectAll

contacto.insert = function(data, callback) {
  if(database) {
    var sql = "INSERT INTO Contacto SET ?"
    database.query(sql, data, function(error, resultado) {
      if(error) {
        throw error;
      } else {
        callback(null, {"insertId": resultado.insertId});
      }
    });//Fin query
  }//Fin IF
}//FIN SelectAll

contacto.update = function(data, callback) {
  if(database) {
    var sql = "UPDATE Contacto SET "
    +"nombre = ?, apellido = ?, direccion = ?, telefono = ?, correo = ?, idCategoria = ?  "
    +"WHERE idContacto = ?";
    database.query(sql,
    [data.nombre, data.apellido, data.direccion, data.telefono, data.correo, data.idCategoria, data.idContacto],
    function(error, resultado) {
      if(error) {
        throw error;
      } else {
        callback(null, data);
      }
    });//Fin query
  }//Fin IF
}//FIN SelectAll

contacto.delete = function(idContacto, callback) {
  if(database) {
    var sql = "CALL sp_deleteContactoDos(?)";
    database.query(sql, idContacto,
    function(error, resultado) {
      if(error) {
        throw error;
      } else {
        callback(null, {"Mensaje": "Eliminado"});
      }
    });//Fin query
  }//Fin IF
}//FIN SelectAll


module.exports = contacto;
