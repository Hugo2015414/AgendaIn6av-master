var database = require('./database');
var tarea = {};

tarea.selectAll = function(idUsuario, callback) {
  if(database) {
    database.query("SELECT * FROM Tarea WHERE idUsuario = ?",
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

tarea.select = function(idTarea, callback) {
  if(database) {
    var sql = "SELECT * FROM Tarea WHERE idTarea = ?";
    database.query(sql, idTarea,
    function(error, resultado) {
      if(error) {
        throw error;
      } else {
        callback(null, resultado);
      }
    });//Fin query
  }//Fin IF
}//FIN SelectAll

tarea.insert = function(data, callback) {
  if(database) {
    database.query("INSERT INTO Tarea SET ? ", data,
    function(error, resultado) {
      if(error) {
        throw error;
      } else {
        callback(null, {"insertId": resultado.insertId});
      }
    });//Fin query
  }//Fin IF
}//FIN SelectAll

tarea.update = function(data, callback) {
  if(database) {
    var sql = "UPDATE Tarea SET "
    +"descripcion = ?, fecha = ? WHERE idTarea = ?";
    database.query(sql,
    [data.descripcion, data.fecha, data.idTarea],
    function(error, resultado) {
      if(error) {
        throw error;
      } else {
        callback(null, {"insertId": resultado.insertId});
      }
    });//Fin query
  }//Fin IF
}//FIN SelectAll

tarea.delete = function(idTarea, callback) {
  if(database) {
    var sql = "CALL sp_deleteTarea(?)";
    database.query(sql, idTarea,
    function(error, resultado) {
      if(error) {
        throw error;
      } else {
        callback(null, {"Mensaje": "Eliminado"});
      }
    });//Fin query
  }//Fin IF
}//FIN SelectAll


module.exports = tarea;
