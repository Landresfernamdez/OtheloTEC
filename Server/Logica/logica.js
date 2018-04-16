/*
===============================================================================================
>  BackEnd de Componentes, se encarga de realizar las llamadas necesarias a la base de datos  <
===============================================================================================
*/

var consultsPreparer = require('../ConsultsPreparer/consultsPreparer');

// inserta componentes
exports.insertarComponente = function(datos, callback) {
    consultsPreparer.insertComponente(datos, function(response) {
        msg = (response.error == 1) ? "Error de conexión" : "No se pudo insertar el componente";
        if (response.success) {
            callback({
                success: true,
                error: response.error,
                title: "Componente agregado",
                message: "Componente agregado con exito",
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

// seleccionar partidas disponibles
exports.seleccionarPartidasDisponibles = function(callback) {
    consultsPreparer.selectPartidasDisponibles( function(response) {
        if (response.success) {
            msg = (response.error == 1) ? "Error de conexión" : "No se pudo seleccionar los componentes";
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

//inserta movimiento o realiza un movimiento
exports.insertMovimiento = function(datos, callback) {
    consultsPreparer.insertMovimiento(datos, function(response) {
        msg = (response.error === 1) ? "Error de conexión" : "No se pudo modificar el componente";
        if (response.success) {
            callback({
                success: true,
                error: response.error,
                title: "Componente editado",
                message: "Componente editado con exito",
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


exports.registrarSesionJuego = function(datos, callback) {
    consultsPreparer.registrarSesionJuego(datos, function(response) {
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