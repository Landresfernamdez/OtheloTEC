/*
================================================
>  Controlador de los Componentes del sistema  <
================================================
*/
var logicaFunciones = require('../Logica Juego/funciones_principales');

var controlador = require('../Logica/logicaComponentes');

exports.realizarMovimiento = function(rRequest, rResponse){
    //console.log(rRequest.body);
    logicaFunciones.validarMovimiento(rRequest.body, function(data){
        //console.log(data)
        rResponse.send(data);
    })
};
exports.login = function(rRequest, rResponse){
    controlador.login(rRequest.body, function(data){
        console.log(data);
        rResponse.send(data);
    });
};
exports.validaCorreo = function(rRequest, rResponse){
    controlador.validaCorreo(rRequest.body, function(data){
        console.log(data);
        rResponse.send(data);
    });
};
exports.insertarUsuario = function(rRequest, rResponse){
    controlador.insertarUsuario(rRequest.body, function(data){
        console.log(data);
        rResponse.send(data);
    });
};

exports.selectSesionesJuegoDisponibles = function(rRequest, rResponse){
    controlador.seleccionarSesionesJuegoDisponibles(function(data){
        rResponse.send(data.data);
    })
};

exports.insertarSesion = function(rRequest, rResponse){
    controlador.insertarSesion(rRequest.body, function(data){
        console.log(data);
        rResponse.send(data);
    });
};
exports.insertarSesion = function(rRequest, rResponse){
    controlador.insertarSesion(rRequest.body, function(data){
        console.log(data);
        rResponse.send(data);
    });
};
exports.insertarUsuarioSesion = function(rRequest, rResponse){
    controlador.insertarUsuarioSesion(rRequest.body, function(data){
        console.log(data);
        rResponse.send(data);
    });
};
exports.selectComponente = function(rRequest, rResponse){
    logicaComponente.seleccionarComponente(function(data){
        rResponse.send(data.data);
    })
};
exports.deleteComponente = function(rRequest, rResponse){
    logicaComponente.eliminarComponente(rRequest.body, function(data){
        rResponse.send(data);
    });
};