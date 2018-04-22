/*
===============================================================================================
>  BackEnd de Componentes, se encarga de realizar las llamadas necesarias a la base de datos  <
===============================================================================================
*/
var consultsPreparer = require('../ConsultsPreparer/consultsPreparer');

exports.insertPartida = function(datos, callback) {
    consultsPreparer.insertPartida(datos, function(response) {
        msg = (response.error === 1) ? "Error de conexión" : "No se pudo registrar la sesion de juego";
        if (response.success) {
            callback({
                success: true,
                error: response.error,
                title: "Sesion de juego registrada",
                message: "Sesion de juego registrada con exito",
                type: "success"
            })
        } else {
            callback({
                success: false,
                message: msg,
                title: "Error",
                error: response.error,
                type: "error"
            })
        }
    });
};

exports.enviarMensaje = function(datos, callback) {
    consultsPreparer.enviarMensaje(datos, function(response) {
        msg = (response.error === 1) ? "Error de conexión" : "No se pudo enviar el mensaje";
        if (response.success) {
            callback({
                success: true,
                error: response.error,
                title: "Mensaje enviado",
                message: "Mensaje enviado con exito",
                type: "success"
            })
        } else {
            callback({
                success: false,
                message: msg,
                title: "Error",
                error: response.error,
                type: "error"
            })
        }
    });
};

exports.login = function(datos, callback) {
    consultsPreparer.login(datos, function(response) {
        msg = (response.error == 1) ? "Error de conexión" : "Credenciales incorrectas";
        if (response.success) {
            callback({
                success: true,
                error: response.error,
                title: "El usuario existe",
                message: "El usuario existe en la base de datos",
                data: response.data,
                type: "success"
            })
        } else {
            callback({
                success: false,
                message: msg,
                title: "Error",
                error: response.error,
                type: "error"
            })
        }
    });
};

exports.validaCorreo = function(datos, callback) {
    consultsPreparer.validaCorreo(datos, function(response) {
        msg = (response.error == 1) ? "Error de conexión" : "Credenciales incorrectas";
        if (response.success) {
            callback({
                success: true,
                error: response.error,
                title: "El usuario existe",
                message: "El usuario existe en la base de datos",
                data: response.data,
                type: "success"
            })
        } else {
            callback({
                success: false,
                message: msg,
                title: "Error",
                error: response.error,
                type: "error"
            })
        }
    });
};

exports.insertarUsuario = function(datos, callback) {
    consultsPreparer.insertarUsuario(datos, function(response) {
        msg = (response.error == 1) ? "Error de conexión" : "Credenciales incorrectas";
        if (response.success) {
            callback({
                success: true,
                error: response.error,
                title: "Se inserto con exito",
                message: "Se inserto en la base de datos con exito",
                data: response.data,
                type: "success"
            })
        } else {
            callback({
                success: false,
                message: msg,
                title: "Error",
                error: response.error,
                type: "error"
            })
        }
    });
};

exports.insertarSesion = function(datos, callback) {
    consultsPreparer.insertarSesion(datos, function(response) {
        msg = (response.error == 1) ? "Error de conexión" : "Credenciales incorrectas";
        if (response.success) {
            callback({
                success: true,
                error: response.error,
                title: "Se inserto con exito",
                message: "Se inserto en la base de datos con exito",
                data: response.data,
                type: "success"
            })
        } else {
            callback({
                success: false,
                message: msg,
                title: "Error",
                error: response.error,
                type: "error"
            })
        }
    });
};

exports.seleccionarSesionesJuegoDisponibles = function(callback) {
    consultsPreparer.selectSesionesJuegoDisponibles( function(response) {
        if (response.success) {
            msg = (response.error == 1) ? "Error de conexión" : "No se pudo seleccionar las sesiones de juego";
            callback({
                success: true,
                data: response.data,
                error: response.error
            })
        } else {
            callback({
                success: false,
                title: "Error",
                error: response.error,
                type: "error"
            })
        }
    });
}; 

exports.insertarUsuarioSesion = function(datos, callback) {
    consultsPreparer.insertarUsuarioSesion(datos, function(response) {
        msg = (response.error == 1) ? "Error de conexión" : "Credenciales incorrectas";
        if (response.success) {
            callback({
                success: true,
                error: response.error,
                title: "Se inserto con exito",
                message: "Se inserto en la base de datos con exito",
                data: response.data,
                type: "success"
            })
        } else {
            callback({
                success: false,
                message: msg,
                title: "Error",
                error: response.error,
                type: "error"
            })
        }
    });
};

exports.misSesiones = function(datos, callback) {
    consultsPreparer.misSesiones(datos, function(response) {
        msg = (response.error == 1) ? "Error de conexión" : "Credenciales incorrectas";
        if (response.success) {
            callback({
                success: true,
                error: response.error,
                title: "Se inserto con exito",
                message: "Se inserto en la base de datos con exito",
                data: response.data,
                type: "success"
            })
        } else {
            callback({
                success: false,
                message: msg,
                title: "Error",
                error: response.error,
                type: "error"
            })
        }
    });
};

exports.detalles = function(datos, callback) {
    consultsPreparer.detalles(datos, function(response) {
        msg = (response.error == 1) ? "Error de conexión" : "Credenciales incorrectas";
        if (response.success) {
            callback({
                success: true,
                error: response.error,
                title: "Se recuperaron las partidas con exito",
                message: "Se recuperaron las partidas con exito",
                data: response.data,
                type: "success"
            })
        } else {
            callback({
                success: false,
                message: msg,
                title: "Error",
                error: response.error,
                type: "error"
            })
        }
    });
};

exports.partidaActual = function(datos, callback) {
    consultsPreparer.partidaActual(datos, function(response) {
        msg = (response.error == 1) ? "Error de conexión" : "Credenciales incorrectas";
        if (response.success) {
            callback({
                success: true,
                error: response.error,
                title: "Se recupero la partida con exito",
                message: "Se recupero la partida con exito",
                data: response.data,
                type: "success"
            })
        } else {
            callback({
                success: false,
                message: msg,
                title: "Error",
                error: response.error,
                type: "error"
            })
        }
    });
};