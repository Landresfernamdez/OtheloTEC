var logica = require('../Logica/logica');
var Request = require('tedious').Request;
var TYPES = require('tedious').TYPES;
var sqlConection = require('../ConexionDBs/sqlConection');

var matriz = [[0,0,0,0,0,0],
              [0,0,0,0,0,0],
              [0,0,1,2,0,0],
              [0,0,2,1,0,0],
              [0,0,0,0,0,0],
              [0,0,0,0,0,0]], listaFichas = [];
              
/**
 * Funcion encargada de convertir un string en una matriz cuadrada dependiendo de una cantidad n de elementos.
 * Ejemplo: 'abcdefghi' -> [[a,b,c],[d,e,f],[g,h,i]]
 */
exports.obtenerMatriz = function (matrizString,tamanoTablero){
    var matrizFinal = [];
    for (let i = 0; i < matrizString.length; i++) {
        var matAux = [];
        for (let j = 0; j < tamanoTablero; j++) {
            matAux.push(matrizString[i+j]);
        }
        i += 2;
        matrizFinal.push(matAux);
    }
    return matrizFinal;
}
/**
 * Funcion encargada de convertir de matriz cuadrada a string.
 * Ejemplo: [[a,b,c],[d,e,f],[g,h,i]] -> 'abcdefghi'
 */
obtenerString = function(matriz){
    var string = '';
    for (let i = 0; i < matriz.length; i++) {
        for (let j = 0; j < matriz.length; j++) {
            string += matriz[i][j];
        }
    }
    return string;
}
/**
 * Funcion encargada de mostrar una matriz en consola.
 */
mostrarMatriz = function(matriz){
    var linea = '';
    for (let i = 0; i < matriz.length; i++) {
        for (let j = 0; j < matriz.length; j++) {
            linea += '  '+matriz[i][j];
        }
        console.log(linea);
        linea = '';
    }
}


validarArriba = function (x,y,jug){ 
    var listaFichasNuevas = [];
    if (x == 0){ 
        return false; // si esta en la primer posicion no puede validar hacia arriba
    }
    x--;
    while (x > 0) {
        if (matriz[x][y] != jug & matriz[x][y] != 0) { // mientras sea la ficha del contrincante siga moviendose
            listaFichasNuevas.push([x,y]);
            x--;
        }
        else
            break;      
    }
    if (matriz[x][y] == jug & listaFichasNuevas.length > 0){ // la ficha uno es del jugador, las otras son del enemigo y la ultima es del jugador
        listaFichas = listaFichasNuevas;
        return true;
    }
    else{
        listaFichas = [];
        return false;
    }
}
validarAbajo = function (x,y,jug){ 
    var listaFichasNuevas = [];
    if (x == matriz.length - 1){ 
        return false; // si esta en la ultima posicion no puede validar hacia abajo
    }
    x++;
    while (x < matriz.length - 1) {
        if (matriz[x][y] != jug & matriz[x][y] != 0) { // mientras sea la ficha del contrincante siga moviendose
            listaFichasNuevas.push([x,y]);
            x++;
        }
        else
            break;      
    }
    if (matriz[x][y] == jug & listaFichasNuevas.length > 0){ // la ficha uno es del jugador, las otras son del enemigo y la ultima es del jugador
        listaFichas = listaFichasNuevas;
        return true;
    }
    else{
        listaFichas = [];
        return false;
    }
}
validarDerecha = function (x,y,jug){ 
    var listaFichasNuevas = [];
    if (y == matriz.length - 1){ 
        return false; // si esta en la ultima posicion no puede validar hacia abajo
    }
    y++;
    while (y < matriz.length - 1) {
        if (matriz[x][y] != jug & matriz[x][y] != 0) { // mientras sea la ficha del contrincante siga moviendose
            listaFichasNuevas.push([x,y]);
            y++;
        }
        else
            break;      
    }
    if (matriz[x][y] == jug & listaFichasNuevas.length > 0){ // la ficha uno es del jugador, las otras son del enemigo y la ultima es del jugador
        listaFichas = listaFichasNuevas;
        return true;
    }
    else{
        listaFichas = [];
        return false;
    }
}
validarIzquierda = function (x,y,jug){ 
    var listaFichasNuevas = [];
    if (y == 0){ 
        return false; // si esta en la ultima posicion no puede validar hacia abajo
    }
    y--;
    while (y > 0) {
        if (matriz[x][y] != jug & matriz[x][y] != 0) { // mientras sea la ficha del contrincante siga moviendose
            listaFichasNuevas.push([x,y]);
            y--;
        }
        else
            break;      
    }
    if (matriz[x][y] == jug & listaFichasNuevas.length > 0){ // la ficha uno es del jugador, las otras son del enemigo y la ultima es del jugador
        listaFichas = listaFichasNuevas;
        return true;
    }
    else{
        listaFichas = [];
        return false;
    }
}
validarArribaDerecha = function (x,y,jug){ 
    var listaFichasNuevas = [];
    if (x == 0 | y == matriz.length - 1){ 
        return false; // si esta en la esquina derecha de arriba no puede validar porque se saldria de la matriz
    }
    x--;
    y++;
    while (x > 0 & y < matriz.length - 1) {
        if (matriz[x][y] != jug & matriz[x][y] != 0) { // mientras sea la ficha del contrincante siga moviendose
            listaFichasNuevas.push([x,y]);
            x--;
            y++;
        }
        else
            break;      
    }
    if (matriz[x][y] == jug & listaFichasNuevas.length > 0){ // la ficha uno es del jugador, las otras son del enemigo y la ultima es del jugador
        listaFichas = listaFichasNuevas;
        return true;
    }
    else{
        listaFichas = [];
        return false;
    }    
}
validarAbajoDerecha = function (x,y,jug){ 
    var listaFichasNuevas = [];
    if (x == matriz.length - 1 | y == matriz.length - 1){ 
        return false; // si esta en la esquina derecha de abajo no puede validar porque se saldria de la matriz
    }
    x++;
    y++;
    while (x < matriz.length - 1 & y < matriz.length - 1) {
        if (matriz[x][y] != jug & matriz[x][y] != 0) { // mientras sea la ficha del contrincante siga moviendose
            listaFichasNuevas.push([x,y]);
            x++;
            y++;
        }
        else
            break;      
    }
    if (matriz[x][y] == jug & listaFichasNuevas.length > 0){ // la ficha uno es del jugador, las otras son del enemigo y la ultima es del jugador
        listaFichas = listaFichasNuevas;
        return true;
    }
    else{
        listaFichas = [];
        return false;
    }
}
validarArribaIzquierda = function (x,y,jug){ 
    var listaFichasNuevas = [];
    if (x == 0 | y == 0){ 
        return false; // si esta en la esquina izquierda de arriba no puede validar porque se saldria de la matriz
    }
    x--;
    y--;
    while (x > 0 & y > 0) {
        if (matriz[x][y] != jug & matriz[x][y] != 0) { // mientras sea la ficha del contrincante siga moviendose
            listaFichasNuevas.push([x,y]);
            x--;
            y--;
        }
        else
            break;      
    }
    if (matriz[x][y] == jug & listaFichasNuevas.length > 0){ // la ficha uno es del jugador, las otras son del enemigo y la ultima es del jugador
        listaFichas = listaFichasNuevas;
        return true;
    }
    else{
        listaFichas = [];
        return false;
    }
}
validarAbajoIzquierda = function (x,y,jug){
    var listaFichasNuevas = [];
    if (x == matriz.length | y == 0){ 
        return false; // si esta en la esquina izquierda de arriba no puede validar porque se saldria de la matriz
    }
    x++;
    y--;
    while (x < matriz.length & y > 0) {
        if (matriz[x][y] != jug & matriz[x][y] != 0) { // mientras sea la ficha del contrincante siga moviendose
            listaFichasNuevas.push([x,y]);
            x++;
            y--;
        }
        else
            break;      
    }
    if (matriz[x][y] == jug & listaFichasNuevas.length > 0){ // la ficha uno es del jugador, las otras son del enemigo y la ultima es del jugador
        listaFichas = listaFichasNuevas;
        return true;
    }
    else{
        listaFichas = [];
        return false;
    }
}

// despues de dar click viene aqui
exports.validarMovimiento = function(datos,callback){
    console.log('x: '+datos.x)
    try {        
        var x = datos.x, y = datos.y, jug = datos.jug;
        var validas = 0;
        if (matriz[x][y] == 0) // si hay un espacio en blanco puede colochar ficha
        {
            //validar todas las direcciones
            if(validarArriba(x,y,jug)){
                console.log("Entro en arriba\n");
                validas++;
                cambiarColor(parseInt(datos.x),parseInt(datos.y),jug);
                mostrarMatriz(matriz);                     
            }
            if(validarAbajo(x,y,jug)){
                console.log("Entro en abajo\n");
                validas++;
                cambiarColor(parseInt(datos.x),parseInt(datos.y),jug);
                mostrarMatriz(matriz);
            }
            if(validarDerecha(x,y,jug)){
                console.log("Entro en derecha\n");
                validas++;
                cambiarColor(parseInt(datos.x),parseInt(datos.y),jug);
                mostrarMatriz(matriz);
            }
            if(validarIzquierda(x,y,jug)){

                console.log("Entro en izquierda\n");
                validas++;
                cambiarColor(parseInt(datos.x),parseInt(datos.y),jug);
                /*matriz = [[0,0,0,0,0,0],
                          [0,0,0,0,0,0],
                          [0,0,1,2,0,0],
                          [0,0,2,1,0,0],
                          [0,0,0,0,0,0],
                          [0,0,0,0,0,0]];*/
                mostrarMatriz(matriz);
            }
            if(validarArribaDerecha(x,y,jug)){
                console.log("Entro en arriba-derecha\n");
                validas++;
                cambiarColor(parseInt(datos.x),parseInt(datos.y),jug);
                mostrarMatriz(matriz);
            }
            if(validarAbajoDerecha(x,y,jug)){
                console.log("Entro en abajo-derecha\n");
                validas++;
                cambiarColor(parseInt(datos.x),parseInt(datos.y),jug);
                mostrarMatriz(matriz);
            }
            if(validarArribaIzquierda(x,y,jug)){
                console.log("Entro en arriba-izquierda\n");
                validas++;
                cambiarColor(parseInt(datos.x),parseInt(datos.y),jug);
                mostrarMatriz(matriz);
            }
            if(validarAbajoIzquierda(x,y,jug)){
                console.log("Entro en abajo-izquierda\n");
                validas++;
                cambiarColor(parseInt(datos.x),parseInt(datos.y),jug);
                mostrarMatriz(matriz);
            }
            if (validas == 0){
                console.log("Movimiento invalido\n" + listaFichas);
                callback({
                    success: false,
                    title: "Error",
                    message: "Movimiento invalido",
                    data: matriz,
                    type: "error"
                })
            }
            else{
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
                var temp=obtenerString(matriz);
                console.log(datos);
                console.log("string:"+temp);
                request.addParameter('ID', TYPES.Int,parseInt(datos.ID));
                request.addParameter('Turno', TYPES.Int,parseInt(datos.Turno));
                request.addParameter('ID_SJ', TYPES.Int,parseInt(datos.ID_SJ));    
                request.addParameter('EstadoPartida', TYPES.Int,parseInt(datos.EstadoPartida));
                request.addParameter('Puntos_P1', TYPES.Int,parseInt(datos.Puntos_P1));
                request.addParameter('Puntos_P2', TYPES.Int,parseInt(datos.Puntos_P2));
                request.addParameter('MatrizJuego', TYPES.VarChar,temp);
            
                request.addOutputParameter('success', TYPES.Bit);
            
                sqlConection.callProcedure(request, function(response){
                    console.log(response);
                    
                    if (response.success == 1){
                        console.log('SIII')
                        callback({
                            success: true,
                            error: response.error,
                            title: "Good",
                            message: 'Movimiento exitoso',
                            data: matriz,
                            type: "success"
                        })
                    }
                    else{
                        console.log('Fuck')
                        callback({
                            success: false,
                            error: response.error,
                            title: "Error",
                            message: 'Movimiento invalido',
                            data: matriz,
                            type: "error"
                        })
                    }
                });
                /*

                /*
                logica.insertMovimiento(datos,function (response){
                    if(response.success){
                        callback({
                            success: true,
                            title: "Movimiento exitoso",
                            data: response,
                            message: "Movimiento realizado",
                            type: "success"
                        })
                    }
                    else{
                        console.log("Movimiento invalido\n" + listaFichas);
                        callback({
                            success: false,
                            title: "Error",
                            message: "Movimiento invalido",
                            data: matriz,
                            type: "error"
                        })
                    }
                });*/
            }
        }
        else
            return false; // no puede jugar ahi
    } catch (error) {
        console.log('ERROR');
        console.log(error);
    }
}

cambiarColor = function (x,y,jug) {
    matriz[x][y] = jug;
    for (let i = 0; i < listaFichas.length; i++){ // cambiar color de fichas ganadas
        matriz[listaFichas[i][0]][listaFichas[i][1]] = jug;
    }
    listaFichas = []; // limpiamos lista de fichas nuevas
}