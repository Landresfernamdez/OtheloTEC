var Request = require('tedious').Request;
var TYPES = require('tedious').TYPES;
var sqlConection = require('../ConexionDBs/sqlConection.js');

/*
===========================
>  CRUD's de Componentes  <
>   - insert              <
>   - select              <
>   - edit                <
>   - delete              <
===========================
*/
exports.insertComponente = function insertComponente(datos, callback) {
    var request = new Request('insertComponente', function(err) { // nombre de procedimiento en la base de datos
        if (err) {
            callback({
                success: false,
                error: request.error,
                title: "Error",
                message: "Sucedio un error en la inserción de los datos",
                type: "error"
            })
        }
    });
    request.addParameter('ID_Dimension', TYPES.Int, datos.ID_Dimension);
    request.addParameter('Componente', TYPES.VarChar, datos.Componente);
    request.addOutputParameter('success', TYPES.Bit);
    
    sqlConection.callProcedure(request, function(res) {
        callback(res);
    });
}

exports.selectPartidasDisponibles = function(callback) {
    var request = new Request("SELECT * FROM Partidas ", function(err) {
        if (err) {
            callback({
                success: false,
                data: err,
                error: request.error,
                title: "Error",
                message: "Error obteniendo los datos. Revise su conexión",
                type: "error"
            });
        }
    });
    // se usa executeRequest porque es el destinado para escribir consultas desde aca en vez de llamar procedimientos almacenados
    sqlConection.executeRequest(request, callback); 
}

exports.insertMovimiento = function insertMovimiento(datos, callback) {
    var request = new Request('editPartida', function(err) {
        if (err) {
            callback({
                success: false,
                error: request.error,
                title: "Error",
                message: "Sucedio un error en la modificación de los datos",
                type: "error"
            })
        }
    });

    request.addParameter('ID', TYPES.Int, datos.ID);
    request.addParameter('Turno', TYPES.Int, datos.Turno);
    request.addParameter('ID_SJ', TYPES.Int, datos.ID_SJ);    
    request.addParameter('EstadoPartida', TYPES.Int, datos.EstadoPartida);
    request.addParameter('Puntos_P1', TYPES.Int, datos.Puntos_P1);
    request.addParameter('Puntos_P2', TYPES.Int, datos.Puntos_P2);
    //request.addParameter('MatrizJuego', TYPES.Int, datos.Matriz);

    request.addOutputParameter('success', TYPES.Bit);

    sqlConection.callProcedure(request, callback);
};
// DELETE 
exports.deleteComponente = function deleteComponente(datos, callback) {
    var request = new Request('deleteComponente', function(err) {
        if (err) {
            msg = (request.error == 1) ? "Error de conexión" : "No se puede eliminar el componente";
            callback({
                success: false,
                data: err,
                error: request.error,
                title: "Error",
                message: msg,
                type: "error"
            })
        }
    });
    request.addParameter('ID_Componente', TYPES.Int, datos.ID);
    
    request.addOutputParameter('success', TYPES.Bit);

    sqlConection.callProcedure(request, callback);
}