/*
================================================
>  Controlador de los Componentes del sistema  <
================================================
*/
var funciones = require('../Logica Juego/funciones_principales');
var logicaComponente = require('../Logica/logica');

exports.realizarMovimiento = function(rRequest, rResponse){
    console.log(rRequest.body)
    funciones.validarMovimiento(rRequest.body, function(data){
        console.log('=========    DATA    =========');
        console.log(data);
        rResponse.send(data);
    })
};

exports.enviarMensaje = function(rRequest, rResponse){
    logicaComponente.enviarMensaje(rRequest.query, function(data){
        console.log('=========    DATA   =========');
        console.log(data);
        rResponse.send(data);
    })
};

exports.insertPartida = function(rRequest, rResponse){
    logicaComponente.insertPartida(rRequest.body, function(data){
        rResponse.send(data);
    });
};

exports.selectSesionesJuegoDisponibles = function(rRequest, rResponse){
    logicaComponente.seleccionarSesionesJuegoDisponibles(function(data){
        rResponse.send(data.data);
    })
};

exports.registrarSesionJuego = function(rRequest, rResponse){
    logicaComponente.registrarSesionJuego(rRequest.body, function(data){
        rResponse.send(data);
    });
};