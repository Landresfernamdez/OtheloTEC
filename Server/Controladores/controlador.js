/*
================================================
>  Controlador de los Componentes del sistema  <
================================================
*/
var funciones = require('../Logica Juego/funciones_principales');
var logica = require('../Logica/logica');

exports.realizarMovimiento = function(rRequest, rResponse){
    console.log('=========    BODY    =========');
    console.log(rRequest.body)
    console.log('=========    BODY    =========');
    funciones.validarMovimiento(rRequest.body, function(data){
        console.log('=========    DATA    =========');
        console.log(data);
        rResponse.send(data);
    })
};

exports.insertPartida = function(rRequest, rResponse){
    logica.insertPartida(rRequest.body, function(data){
        rResponse.send(data);
    });
};

exports.enviarMensaje = function(rRequest, rResponse){
    logica.enviarMensaje(rRequest.body, function(data){
        console.log('=========    DATA   =========');
        console.log(data);
        rResponse.send(data);
    })
};

exports.login = function(rRequest, rResponse){
    logica.login(rRequest.body, function(data){
        console.log(data);
        rResponse.send(data);
    });
};

exports.validaCorreo = function(rRequest, rResponse){
    logica.validaCorreo(rRequest.body, function(data){
        console.log(data);
        rResponse.send(data);
    });
};

exports.insertarUsuario = function(rRequest, rResponse){
    logica.insertarUsuario(rRequest.body, function(data){
        console.log(data);
        rResponse.send(data);
    });
};

exports.insertarSesion = function(rRequest, rResponse){
    logica.insertarSesion(rRequest.body, function(data){
        console.log(data);
        rResponse.send(data);
    });
};

exports.selectSesionesJuegoDisponibles = function(rRequest, rResponse){
    logica.seleccionarSesionesJuegoDisponibles(function(data){
        rResponse.send(data.data);
    })
};

exports.insertarUsuarioSesion = function(rRequest, rResponse){
    logica.insertarUsuarioSesion(rRequest.body, function(data){
        console.log(data);
        rResponse.send(data);
    });
};

exports.misSesiones = function(rRequest, rResponse){
    logica.misSesiones(rRequest.body, function(data){
        console.log(data);
        rResponse.send(data);
    });
};

exports.detalles = function(rRequest, rResponse){
    logica.detalles(rRequest.body, function(data){
        console.log(data);
        rResponse.send(data);
    });
};

exports.partidaActual = function(rRequest, rResponse){
    logica.partidaActual(rRequest.body, function(data){
        console.log(data);
        rResponse.send(data);
    });
};
