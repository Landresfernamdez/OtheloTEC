/*
================================================
>  Controlador de los Componentes del sistema  <
================================================
*/
var funciones = require('../Logica Juego/funciones_principales2');
var logicaComponente = require('../Logica/logica');

exports.realizarMovimiento = function(rRequest, rResponse){
    console.log(rRequest.body)
    funciones.validarMovimiento(rRequest.body, function(data){
        console.log('=========    DATA    =========');
        console.log(data);
        rResponse.send(data);
    })
};

exports.insertPartida = function(rRequest, rResponse){
    logicaComponente.insertPartida(rRequest.body, function(data){
        rResponse.send(data);
    });
};

exports.selectPartidasDisponibles = function(rRequest, rResponse){
    logicaComponente.seleccionarPartidasDisponibles(function(data){
        rResponse.send(data.data);
    })
};

exports.registrarSesionJuego = function(rRequest, rResponse){
    logicaComponente.registrarSesionJuego(rRequest.body, function(data){
        rResponse.send(data);
    });
};