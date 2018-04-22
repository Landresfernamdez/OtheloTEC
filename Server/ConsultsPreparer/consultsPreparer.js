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

exports.selectSesionesJuegoDisponibles = function(callback) {
    var request = new Request("SELECT * FROM SesionesJuego WHERE Estado = 0", function(err) {
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

exports.registrarSesionJuego = function registrarSesionJuego(datos, callback) {
    var request = new Request('insertSesionJuego', function(err) {
        if (err) {
            msg = (request.error == 1) ? "Error de conexión" : "No se puede insertar la sesion de juego";
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
    request.addParameter('NumPartidas', TYPES.Int, datos.NumPartidas);
    request.addParameter('N_Tablero', TYPES.Int, datos.NTablero);
    request.addParameter('ColorFondo', TYPES.VarChar, datos.ColorFondo);
    request.addParameter('NivelDificultad', TYPES.Int, datos.Dificultad);    
    request.addParameter('TipoPartida', TYPES.Int, datos.TipoPartida);
    
    request.addOutputParameter('success', TYPES.Bit);

    sqlConection.callProcedure(request, callback);
}

exports.insertPartida = function insertPartida(datos, callback) {
    var request = new Request('insertPartida', function(err) {
        if (err) {
            msg = (request.error == 1) ? "Error de conexión" : "No se puede insertar la sesion de juego";
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
    //console.log(datos.MatrizJuego);
    request.addParameter('ID_SJ', TYPES.Int, datos.ID_SJ);
    request.addParameter('MatrizJuego', TYPES.VarChar, datos.MatrizJuego);
    
    request.addOutputParameter('success', TYPES.Bit);

    sqlConection.callProcedure(request, callback);
}

exports.enviarMensaje = function enviarMensaje(datos, callback) {
    var request = new Request('insertMensaje', function(err) {
        if (err) {
            msg = (request.error == 1) ? "Error de conexión" : "No se puede insertar el mensaje";
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
    //console.log(datos.MatrizJuego);
    request.addParameter('ID_Partida', TYPES.Int, datos.ID_Partida);
    request.addParameter('Nickname', TYPES.VarChar, datos.Nickname);
    request.addParameter('Mensaje', TYPES.VarChar, datos.Mensaje);
    
    request.addOutputParameter('success', TYPES.Bit);

    sqlConection.callProcedure(request, callback);
}