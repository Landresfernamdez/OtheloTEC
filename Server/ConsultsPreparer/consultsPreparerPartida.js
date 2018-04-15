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
//Valida si existe el usuario con su correo y contraseña
exports.login = function login(datos, callback) {
    var request = new Request('selectUsuario', function(err) { // nombre de procedimiento en la base de datos
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
exports.selectComponente = function(callback) {
    var request = new Request("SELECT * FROM Componentes", function(err) {
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
exports.editComponente = function editComponente(datos, callback) {
    var request = new Request('realizarMovimiento', function(err) {
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
    //request.addParameter('ID_Partida', TYPES.Int, datos.ID);
    //request.addParameter('Matriz', TYPES.VarChar, datos.ID_Dimension);

   // request.addOutputParameter('success', TYPES.Bit);

   // sqlConection.callProcedure(request, callback);
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