var database = require('./database');
var cita = {};

cita.selectAll = function(idUsuario, callback) {
  if(database) {
    database.query("SELECT * FROM Cita WHERE idUsuario = ?",
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

cita.select = function(idCita, callback) {
  if(database) {
    var sql = "SELECT * FROM Cita WHERE idCita = ?";
    database.query(sql, idCita,
    function(error, resultado) {
      if(error) {
        throw error;
      } else {
        callback(null, resultado);
      }
    });//Fin query
  }//Fin IF
}//FIN SelectAll

cita.insert = function(data, callback) {
  if(database) {
    database.query("INSERT INTO Cita SET ? ", data,
    function(error, resultado) {
      if(error) {
        throw error;
      } else {
        callback(null, {"insertId": resultado.insertId});
      }
    });//Fin query
  }//Fin IF
}//FIN SelectAll

cita.update = function(data, callback) {
  if(database) {
    var sql = "UPDATE Cita SET "
    +"descripcion = ?, fecha = ?, hora = ?, lugar = ? WHERE idCita = ?";
    database.query(sql,
    [data.descripcion, data.fecha, data.hora, data.lugar, data.idCita],
    function(error, resultado) {
      if(error) {
        throw error;
      } else {
        callback(null, {"insertId": resultado.insertId});
      }
    });//Fin query
  }//Fin IF
}//FIN SelectAll

cita.delete = function(idCita, callback) {
  if(database) {
    var sql = "DELETE FROM Cita WHERE idCita = ?";
    database.query(sql, idCita,
    function(error, resultado) {
      if(error) {
        throw error;
      } else {
        callback(null, {"Mensaje": "Eliminado"});
      }
    });//Fin query
  }//Fin IF
}//FIN SelectAll


module.exports = cita;
