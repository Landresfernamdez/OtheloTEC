var Request = require('tedious').Request;
var TYPES = require('tedious').TYPES;
var sqlConection = require('../ConexionDBs/sqlConection.js');
var funciones = require('../Logica Juego/funciones_principales');

/*
===========================
>  CRUD's de Componentes  <
>   - insert              <
>   - select              <
>   - edit                <
>   - delete              <
===========================
*/
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

//Valida si existe el usuario con su correo y contraseña
exports.login = function login(datos, callback) {
    var request = new Request('selectUsuario', function(err) { // nombre de procedimiento en la base de datos
        if (err){
            callback({
                success: false,
                error: request.error,
                title: "Error",
                message: "Sucedio un error en la inserción de los datos",
                type: "error"
            })
        }
    });
    console.log(datos);
    request.addParameter('Correo', TYPES.VarChar, datos.correo);
    request.addParameter('Contrasenia', TYPES.VarChar, datos.clave);
    request.addOutputParameter('success', TYPES.Bit);
    sqlConection.callProcedure(request, function(res) {
        callback(res);
    });
}

//Valida si existe el usuario con su correo
exports.validaCorreo = function validaCorreo(datos, callback) {
    var request = new Request('existeUsuario', function(err) { // nombre de procedimiento en la base de datos
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
    console.log(datos);
    request.addParameter('Correo', TYPES.VarChar, datos.correo);
    request.addOutputParameter('success', TYPES.Bit);
    sqlConection.callProcedure(request, function(res) {
        callback(res);
    });
}

exports.insertarUsuario = function insertarUsuario(datos, callback) {
    var request = new Request('insertUsuario', function(err) { // nombre de procedimiento en la base de datos
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
    console.log(datos);
    request.addParameter('Correo', TYPES.VarChar, datos.correo);
    request.addParameter('Nickname', TYPES.VarChar, datos.nickname);
    request.addParameter('Contrasena', TYPES.VarChar, datos.clave);
    request.addOutputParameter('success', TYPES.Bit);
    sqlConection.callProcedure(request, function(res) {
        console.log("prueba");
        console.log(res);
        callback(res);
    });
}

exports.insertarSesion = function insertarSesion(datos, callback) {
    var request = new Request('insertSesionJuego', function(err) { // nombre de procedimiento en la base de datos
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
    console.log(datos);
    request.addParameter('NumPartidas', TYPES.Int, datos.partidas);
    request.addParameter('N_Tablero', TYPES.Int, datos.n);
    request.addParameter('NivelDificultad', TYPES.Int, datos.nivel);
    request.addParameter('TipoPartida', TYPES.Int, datos.tipo);
    request.addParameter('IdUsuario', TYPES.VarChar, datos.correo);
    request.addParameter('colorFicha', TYPES.VarChar, datos.color);
    request.addOutputParameter('success', TYPES.Bit);
    sqlConection.callProcedure(request, function(res) {
        console.log("prueba");
        console.log(res);
        callback(res);
    });
}

exports.selectSesionesJuegoDisponibles = function(callback) {
    var query = "SELECT us.ID,us.Correo,us.Nickname,temp.ID_SJ,temp.N_Tablero,temp.NivelDificultad,temp.TipoPartida,temp.NumPartidas FROM Usuarios as us inner join "+
    "(SELECT * FROM SesionesJuego  as sj inner join Usuarios_SesionJuego as u on  sj.Estado = 0 and u.ID_SJ=sj.ID) as temp"+
    " on us.ID=temp.ID";
    var request = new Request(query, function(err) {
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

exports.insertarUsuarioSesion = function insertarUsuarioSesion(datos, callback) {
    var request = new Request('insertUsuario_SesionJuego', function(err) { // nombre de procedimiento en la base de datos
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
    console.log(datos);
    request.addParameter('ID_SesionJuego', TYPES.Int, datos.idsesion);
    request.addParameter('Correo', TYPES.VarChar, datos.correo);
    request.addParameter('colorFicha', TYPES.VarChar, datos.color);
    request.addOutputParameter('success', TYPES.Bit);
    sqlConection.callProcedure(request, function(res) {
        console.log("prueba");
        console.log(res);
        callback(res);
    });
}

exports.misSesiones = function misSesiones(datos, callback) {
    var request = new Request('misSesiones', function(err) { // nombre de procedimiento en la base de datos
        if (err) {
            callback({
                success: false,
                error: request.error,
                title: "Error",
                message: "Error a la hora de recuperar los datos",
                type: "error"
            })
        }
    });
    request.addParameter('correo', TYPES.VarChar, datos.correo);
    request.addParameter('filtro', TYPES.Char, datos.filtro);
    request.addOutputParameter('success', TYPES.Bit);
    sqlConection.callProcedure(request, function(res) {
        console.log("prueba");
        console.log(res);
        callback(res);
    });
}

exports.detalles = function detalles(datos, callback) {
    var request = new Request('devuelvePartidas', function(err) { // nombre de procedimiento en la base de datos
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
    console.log(datos);
    request.addParameter('ID_S', TYPES.Int, datos.id_sesion);
    request.addOutputParameter('success', TYPES.Bit);
    sqlConection.callProcedure(request, function(res) {
        console.log("prueba");
        console.log(res);
        callback(res);
    });
}

exports.partidaActual = function partidaActual(datos, callback) {
    var request = new Request('partidaActual', function(err) { // nombre de procedimiento en la base de datos
        if (err) {
            callback({
                success: false,
                error: request.error,
                title: "Error",
                message: "Error en la recuperacion de la partida",
                type: "error"
            })
        }
    });
    console.log(datos);
    request.addParameter('ID_S', TYPES.Int, datos.id_sesion);
    request.addOutputParameter('success', TYPES.Bit);
    sqlConection.callProcedure(request, function(res) {
        console.log("prueba");
        console.log(res);
        
        funciones.setMatrizJuego(res.data[0].MatrizJuego);
        callback(res);
    });
}