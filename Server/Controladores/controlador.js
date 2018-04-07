/*
================================================
>  Controlador de los Componentes del sistema  <
================================================
*/
var funciones = require('../Logica Juego/funciones_principales');
var logicaComponente = require('../Logica/logica');

exports.realizarMovimiento = function(rRequest, rResponse){
    console.log(rRequest.query)
    funciones.validarMovimiento(rRequest.query, function(data){
        rResponse.send(data);
    })
};

exports.editComponente = function(rRequest, rResponse){
    funciones.editarComponente(rRequest.body, function(data){
        rResponse.send(data);
    });
};

exports.selectPartidasDisponibles = function(rRequest, rResponse){
    logicaComponente.seleccionarPartidasDisponibles(function(data){
        rResponse.send(data.data);
    })
};

exports.deleteComponente = function(rRequest, rResponse){
    logicaComponente.eliminarComponente(rRequest.body, function(data){
        rResponse.send(data);
    });
};