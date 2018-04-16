var logica = require('../Logica/logica');
var Request = require('tedious').Request;
var TYPES = require('tedious').TYPES;
var sqlConection = require('../ConexionDBs/sqlConection');

var matriz = [[0,0,0,0,0,0],
              [0,0,0,0,0,0],
              [0,0,1,2,0,0],
              [0,0,2,1,0,0],
              [0,0,0,0,0,0],
              [0,0,0,0,0,0]], listaFichas = [], jugadas = [],ID_Partida = 1, EstadoPartida = 0;
              
/**
 * Funcion encargada de convertir un string en una matriz cuadrada dependiendo de una cantidad n de elementos.
 * Ejemplo: 'abcdefghi' -> [[a,b,c],[d,e,f],[g,h,i]]
 */
var obtenerMatriz = function (matrizString,tamanoTablero){
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
var obtenerString = function(matriz){
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
var mostrarMatriz = function(matriz){
    var linea = '';
    for (let i = 0; i < matriz.length; i++) {
        for (let j = 0; j < matriz.length; j++) {
            linea += '  '+matriz[i][j];
        }
        console.log(linea);
        linea = '';
    }
}

/**
 *
 * @param matriz
 * Funcion se encarga de mostrar las fichas
 */
var mostrarFichas = function(matriz){
    var linea = '';
    for (let i = 0; i < matriz.length; i++) {
        linea += '  '+matriz[i].x+","+matriz[i].y;
    }
    console.log(linea);
}

var validarArriba = function (x,y,jug){ 
    var listaFichasNuevas = [], puntos = 0;
    if (x == 0){ 
        return false; // si esta en la primer posicion no puede validar hacia arriba
    }
    x--;
    while (x > 0) {
        if (matriz[x][y] != jug & matriz[x][y] != 0) { // mientras sea la ficha del contrincante siga moviendose
            listaFichasNuevas.push({x: x, y: y});
            x--;
            puntos++;
        }
        else
            break;      
    }
    if (matriz[x][y] == 0 & listaFichasNuevas.length > 0){ // la ficha uno es del jugador, las otras son del enemigo y la ultima es del jugador
        listaFichasNuevas.push({x: x, y: y});
        listaFichas = listaFichasNuevas;
        if (jug == 2)
            jugadas.push({fichas: listaFichas, pts: puntos});
        return true;
    }
    else if (matriz[x][y] == jug & listaFichasNuevas.length > 0){ // la ficha uno es del jugador, las otras son del enemigo y la ultima es del jugador
        listaFichas = listaFichasNuevas;
        return true;
    }
    else{
        listaFichas = [];
        return false;
    }
}
var validarAbajo = function (x,y,jug){ 
    var listaFichasNuevas = [], puntos = 0;
    if (x == matriz.length - 1){ 
        return false; // si esta en la ultima posicion no puede validar hacia abajo
    }
    x++;
    while (x < matriz.length - 1) {
        if (matriz[x][y] != jug & matriz[x][y] != 0) { // mientras sea la ficha del contrincante siga moviendose
            listaFichasNuevas.push({x : x, y : y});
            x++;
            puntos++;
        }
        else
            break;      
    }
    if (matriz[x][y] == 0 & listaFichasNuevas.length > 0){ // la ficha uno es del jugador, las otras son del enemigo y la ultima es del jugador      
        listaFichasNuevas.push({x: x, y: y});
        listaFichas = listaFichasNuevas;
        if (jug == 2)
            jugadas.push({fichas: listaFichas, pts: puntos});
        return true;
    }
    else if (matriz[x][y] == jug & listaFichasNuevas.length > 0){ // la ficha uno es del jugador, las otras son del enemigo y la ultima es del jugador
        listaFichas = listaFichasNuevas;
        return true;
    }
    else{
        listaFichas = [];
        return false;
    }
}
var validarDerecha = function (x,y,jug){ 
    var listaFichasNuevas = [], puntos = 0;
    if (y == matriz.length - 1){ 
        return false; // si esta en la ultima posicion no puede validar hacia abajo
    }
    y++;
    while (y < matriz.length - 1) {
        if (matriz[x][y] != jug & matriz[x][y] != 0) { // mientras sea la ficha del contrincante siga moviendose
            listaFichasNuevas.push({x : x, y : y});
            y++;
            puntos++;
        }
        else
            break;      
    }
    if (matriz[x][y] == 0 & listaFichasNuevas.length > 0){ // la ficha uno es del jugador, las otras son del enemigo y la ultima es del jugador
        listaFichasNuevas.push({x: x, y: y});
        listaFichas = listaFichasNuevas;
        if (jug == 2)
            jugadas.push({fichas: listaFichas, pts: puntos});
        return true;
    }
    else if (matriz[x][y] == jug & listaFichasNuevas.length > 0){ // la ficha uno es del jugador, las otras son del enemigo y la ultima es del jugador
        listaFichas = listaFichasNuevas;
        return true;
    }
    else{
        listaFichas = [];
        return false;
    }
}
var validarIzquierda = function (x,y,jug){ 
    var listaFichasNuevas = [], puntos = 0;
    if (y == 0){ 
        return false; // si esta en la ultima posicion no puede validar hacia abajo
    }
    y--;
    while (y > 0) {
        if (matriz[x][y] != jug & matriz[x][y] != 0) { // mientras sea la ficha del contrincante siga moviendose
            listaFichasNuevas.push({x : x, y : y});
            y--;
            puntos++;
        }
        else
            break;      
    }
    if (matriz[x][y] == 0 & listaFichasNuevas.length > 0){ // la ficha uno es del jugador, las otras son del enemigo y la ultima es del jugador
        listaFichasNuevas.push({x: x, y: y});
        listaFichas = listaFichasNuevas;
        if (jug == 2)
            jugadas.push({fichas: listaFichas, pts: puntos});
        return true;
    }
    else if (matriz[x][y] == jug & listaFichasNuevas.length > 0){ // la ficha uno es del jugador, las otras son del enemigo y la ultima es del jugador
        listaFichas = listaFichasNuevas;
        return true;
    }
    else{
        listaFichas = [];
        return false;
    }
}
var validarArribaDerecha = function (x,y,jug){ 
    var listaFichasNuevas = [], puntos = 0;
    if (x == 0 | y == matriz.length - 1){ 
        return false; // si esta en la esquina derecha de arriba no puede validar porque se saldria de la matriz
    }
    x--;
    y++;
    while (x > 0 & y < matriz.length - 1) {
        if (matriz[x][y] != jug & matriz[x][y] != 0) { // mientras sea la ficha del contrincante siga moviendose
            listaFichasNuevas.push({x : x, y : y});
            x--;
            y++;
            puntos++;
        }
        else
            break;      
    }
    if (matriz[x][y] == 0 & listaFichasNuevas.length > 0){ // la ficha uno es del jugador, las otras son del enemigo y la ultima es del jugador
        listaFichasNuevas.push({x: x, y: y});
        listaFichas = listaFichasNuevas;
        if (jug == 2)
            jugadas.push({fichas: listaFichas, pts: puntos});
        return true;
    }
    else if (matriz[x][y] == jug & listaFichasNuevas.length > 0){ // la ficha uno es del jugador, las otras son del enemigo y la ultima es del jugador
        listaFichas = listaFichasNuevas;
        return true;
    }
    else{
        listaFichas = [];
        return false;
    }    
}
var validarAbajoDerecha = function (x,y,jug){ 
    var listaFichasNuevas = [], puntos = 0;
    if (x == matriz.length - 1 | y == matriz.length - 1){ 
        return false; // si esta en la esquina derecha de abajo no puede validar porque se saldria de la matriz
    }
    x++;
    y++;
    while (x < matriz.length - 1 & y < matriz.length - 1) {
        if (matriz[x][y] != jug & matriz[x][y] != 0) { // mientras sea la ficha del contrincante siga moviendose
            listaFichasNuevas.push({x : x, y : y});
            x++;
            y++;
            puntos++;
        }
        else
            break;      
    }
    if (matriz[x][y] == 0 & listaFichasNuevas.length > 0){ // la ficha uno es del jugador, las otras son del enemigo y la ultima es del jugador
        listaFichasNuevas.push({x: x, y: y});
        listaFichas = listaFichasNuevas;
        if (jug == 2)
            jugadas.push({fichas: listaFichas, pts: puntos});
        return true;
    }
    else if (matriz[x][y] == jug & listaFichasNuevas.length > 0){ // la ficha uno es del jugador, las otras son del enemigo y la ultima es del jugador
        listaFichas = listaFichasNuevas;
        return true;
    }
    else{
        listaFichas = [];
        return false;
    }
}
var validarArribaIzquierda = function (x,y,jug){ 
    var listaFichasNuevas = [], puntos = 0;
    if (x == 0 | y == 0){ 
        return false; // si esta en la esquina izquierda de arriba no puede validar porque se saldria de la matriz
    }
    x--;
    y--;
    while (x > 0 & y > 0) {
        if (matriz[x][y] != jug & matriz[x][y] != 0) { // mientras sea la ficha del contrincante siga moviendose
            listaFichasNuevas.push({x : x, y : y});
            x--;
            y--;
            puntos++;
        }
        else
            break;      
    }
    if (matriz[x][y] == 0 & listaFichasNuevas.length > 0){ // la ficha uno es del jugador, las otras son del enemigo y la ultima es del jugador
        listaFichasNuevas.push({x: x, y: y});
        listaFichas = listaFichasNuevas;
        if (jug == 2)
            jugadas.push({fichas: listaFichas, pts: puntos});
        return true;
    }
    else if (matriz[x][y] == jug & listaFichasNuevas.length > 0){ // la ficha uno es del jugador, las otras son del enemigo y la ultima es del jugador
        listaFichas = listaFichasNuevas;
        return true;
    }
    else{
        listaFichas = [];
        return false;
    }
}
var validarAbajoIzquierda = function (x,y,jug){
    var listaFichasNuevas = [], puntos = 0;
    if (x == matriz.length - 1 | y == 0){ 
        return false; // si esta en la esquina izquierda de arriba no puede validar porque se saldria de la matriz
    }
    x++;
    y--;
    while (x < matriz.length - 1 & y > 0) {
        if (matriz[x][y] != jug & matriz[x][y] != 0) { // mientras sea la ficha del contrincante siga moviendose
            listaFichasNuevas.push({x : x, y : y});
            x++;
            y--;
            puntos++;
        }
        else
            break;      
    }
    if (matriz[x][y] == 0 & listaFichasNuevas.length > 0){ // la ficha uno es del jugador, las otras son del enemigo y la ultima es del jugador
        listaFichasNuevas.push({x: x, y: y});
        listaFichas = listaFichasNuevas;
        if (jug == 2)
            jugadas.push({fichas: listaFichas, pts: puntos});
        return true;
    }
    else if (matriz[x][y] == jug & listaFichasNuevas.length > 0){ // la ficha uno es del jugador, las otras son del enemigo y la ultima es del jugador
        listaFichas = listaFichasNuevas;
        return true;
    }
    else{
        listaFichas = [];
        return false;
    }
}

/**
 * Se encarga de ordenar una lista
 * @param lista a ordenar
 * @returns lista ordenada
 */
function ordenarLista(lista){
    lista.sort(function (a,b) {
        if (parseFloat(a.pts) > parseFloat(b.pts)){
            return -1;
        }
        if (parseFloat(a.pts) < parseFloat(b.pts)){
            return 1;
        }
        // a must be equal to b
        return 0;
    });
    return lista;
}

/**
 *Se encarga de devolver las fichas de la PC
 * @param matriz
 * @returns {Array}
 */
function devuelveFichasPC(jugador){
    var fichas = [];//Fichas que estan en la matriz de la PC
    for(var x = 0; x < matriz[0].length; x++){
        for(var y = 0; y < matriz[0].length; y++){
            if(matriz[x][y] == jugador){
                fichas.push({x: x, y: y});
            }
        }
    }
    return fichas;
}

var validarDirecciones = function(x, y, jug, validas) {
    listaFichas = [];
    console.log('***** validarDirecciones de jugador '+jug+' *****');
    var xResp = x, yResp = y;
    if (matriz[x][y] == 0){ // si hay un espacio en blanco puede colochar ficha
        //validar todas las direcciones
        if(validarArriba(xResp,yResp,jug)){
            console.log("Entro en arriba\n");
            validas++;
            cambiarColor(xResp, yResp, jug);
            //mostrarMatriz(matriz);                     
        }
        xResp = x, yResp = y;
        if(validarAbajo(xResp,yResp,jug)){
            console.log("Entro en abajo\n");
            validas++;
            cambiarColor(xResp, yResp, jug);
            //mostrarMatriz(matriz);
        }
        xResp = x, yResp = y;
        if(validarDerecha(xResp,yResp,jug)){
            console.log("Entro en derecha\n");
            validas++;
            cambiarColor(xResp, yResp, jug);
            //mostrarMatriz(matriz);
        }
        xResp = x, yResp = y;
        if(validarIzquierda(xResp,yResp,jug)){
            console.log("Entro en izquierda\n");
            validas++;
            cambiarColor(xResp, yResp, jug);
            //mostrarMatriz(matriz);
        }
        xResp = x, yResp = y;
        if(validarArribaDerecha(xResp,yResp,jug)){
            console.log("Entro en arriba-derecha\n");
            validas++;
            cambiarColor(xResp, yResp, jug);
            //mostrarMatriz(matriz);
        }
        xResp = x, yResp = y;
        if(validarAbajoDerecha(xResp,yResp,jug)){
            console.log("Entro en abajo-derecha\n");
            validas++;
            cambiarColor(xResp, yResp, jug);
            //mostrarMatriz(matriz);
        }
        xResp = x, yResp = y;
        if(validarArribaIzquierda(xResp,yResp,jug)){
            console.log("Entro en arriba-izquierda\n");
            validas++;
            cambiarColor(xResp, yResp, jug);
            //mostrarMatriz(matriz);
        }
        xResp = x, yResp = y;
        if(validarAbajoIzquierda(xResp,yResp,jug)){
            console.log("Entro en abajo-izquierda\n");
            validas++;
            cambiarColor(xResp, yResp, jug);
            //mostrarMatriz(matriz);
        }
    }
    return validas;    
}

/**
 * Se encarga de determinar si alguna de las fichas de X jugador tiene jugada alguna con el fin de determinar el ganador
 * @param fichasPC
 * @param jugador
 * @returns {boolean}
 */
var fichasJugadorXtienenJugada = function(fichasPC, jugador) {
    listaFichas = [];
    console.log('***** fichasJugadorXtienenJugada de jugador '+jugador+' *****');
    
    console.log(fichasPC);
    
    var x = 0, y = 0, jug = 0, cantidadValidas = 0;
    for (let i = 0; i < fichasPC.length; i++) {
        x = fichasPC[i].x, y = fichasPC[i].y, jug = jugador;
        
        console.log('**** var x: ' + x + ", y: " +y);
        if(validarArriba(x,y,jug)){
            console.log("Entro en arriba\n");
            cantidadValidas++;                    
        }
        
        console.log('**** var x: ' + x + ", y: " +y);        
        if(validarAbajo(x,y,jug)){
            console.log("Entro en abajo\n");
            cantidadValidas++;  
        }
        
        console.log('**** var x: ' + x + ", y: " +y);
        if(validarDerecha(x,y,jug)){
            console.log("Entro en derecha\n");
            cantidadValidas++;  
        }
        
        console.log('**** var x: ' + x + ", y: " +y);
        if(validarIzquierda(x,y,jug)){
            console.log("Entro en izquierda\n");
            cantidadValidas++;
        }
        
        console.log('**** var x: ' + x + ", y: " +y);
        if(validarArribaDerecha(x,y,jug)){
            console.log("Entro en arriba-derecha\n");
            cantidadValidas++;  
        }
        
        console.log('**** var x: ' + x + ", y: " +y);
        if(validarAbajoDerecha(x,y,jug)){
            console.log("Entro en abajo-derecha\n");
            cantidadValidas++;
        }
        
        console.log('**** var x: ' + x + ", y: " +y);
        if(validarArribaIzquierda(x,y,jug)){
            console.log("Entro en arriba-izquierda\n");
            cantidadValidas++;
        }
        
        console.log('**** var x: ' + x + ", y: " +y);
        if(validarAbajoIzquierda(x,y,jug)){
            console.log("Entro en abajo-izquierda\n");
            cantidadValidas++;
        }       
    }    
    if(cantidadValidas > 0)
        return true; 
    else
        return false;
}


/**
 * Posibles jugadas de la computadora ya sea p1 o p2
 */
function posiblesJugadas(fichasPC,jugador){
    console.log('***** posiblesJugadas de jugador '+jugador+' *****');
    for(var i = 0; i < fichasPC.length; i++){
        var x = fichasPC[i].x, y = fichasPC[i].y, jug = jugador;
        
        if(validarArriba(x,y,jug)){
            console.log("Entro en arriba\n");
        }
        if(validarAbajo(x,y,jug)){
            console.log("Entro en abajo\n");
        }
        if(validarDerecha(x,y,jug)){
            console.log("Entro en derecha\n");
        }
        if(validarIzquierda(x,y,jug)){
            console.log("Entro en izquierda\n");
        }
        if(validarArribaDerecha(x,y,jug)){
            console.log("Entro en arriba-derecha\n");
        }
        if(validarAbajoDerecha(x,y,jug)){
            console.log("Entro en abajo-derecha\n");
        }
        if(validarArribaIzquierda(x,y,jug)){
            console.log("Entro en arriba-izquierda\n");
        }
        if(validarAbajoIzquierda(x,y,jug)){
            console.log("Entro en abajo-izquierda\n");
        }
    }
}

// despues de dar click viene aqui
exports.validarMovimiento = function(datos,callback){
    console.log('***** validarMovimiento de jugador '+datos.jug+' *****');
    var jug = datos.jug;
    var matriz_respaldo = matriz;
    //console.log('*****\nx: '+datos.x + '\ny: '+datos.y+'\n*****')
    try {        
        var x = datos.x, y = datos.y, jug = 1;
        var validas = 0, nivel = 0;
        if (datos.tipo == 1){ // P1 vs P2
            nivel = 1;
            validas = validarDirecciones(x, y, jug, validas);
            if (validas == 0){
                console.log("Movimiento invalido\n" + listaFichas);
                callback({
                    success: false,
                    title: "Error",
                    message: "Movimiento invalido",
                    data: {matriz: matriz, turno: jug, nivel: nivel},
                    type: "error"
                })
            }
            else{
                var turno = 0;
                if(jug == 1)
                    turno = 2;
                else
                    turno = 1;
                var requestT1 = new Request('editPartida', function(err) {
                    if (err) {
                        callback({
                            success: false,
                            error: requestT1.error,
                            title: "Error",
                            message: "Sucedio un error en la modificación de los datos",
                            data: {matriz: matriz, turno: jug, nivel: nivel},
                            type: "error"
                        })
                    }
                });
                var temp = obtenerString(matriz);
                console.log(datos);
                console.log("string: "+temp);
                requestT1.addParameter('ID', TYPES.Int,parseInt(datos.ID));
                requestT1.addParameter('Turno', TYPES.Int,parseInt(turno));
                requestT1.addParameter('ID_SJ', TYPES.Int,parseInt(datos.ID_SJ));    
                requestT1.addParameter('EstadoPartida', TYPES.Int,parseInt(datos.EstadoPartida));
                requestT1.addParameter('Puntos_P1', TYPES.Int,parseInt(datos.Puntos_P1));
                requestT1.addParameter('Puntos_P2', TYPES.Int,parseInt(datos.Puntos_P2));
                requestT1.addParameter('MatrizJuego', TYPES.VarChar,temp);
            
                requestT1.addOutputParameter('success', TYPES.Bit);
            
                sqlConection.callProcedure(requestT1, function(response){
                    console.log(response);
                    
                    if (response.success == 1){
                        console.log('SIII')
                        matriz_respaldo = matriz;
                        callback({
                            success: true,
                            error: response.error,
                            title: "Good",
                            message: 'Movimiento exitoso',
                            data: {matriz: matriz, turno: jug, nivel: nivel},
                            type: "success"
                        })
                    }
                    else{
                        console.log('Fuck')
                        matriz = matriz_respaldo;
                        callback({
                            success: false,
                            error: response.error,
                            title: "Error",
                            message: 'Movimiento invalido',
                            data: {matriz: matriz_respaldo, turno: jug, nivel: nivel},
                            type: "error"
                        })
                    }
                });
            }
        }
        else if (datos.tipo == 2){ // P1 vs PC
            
            console.log('Entro en tipo 2');
            validas = 0;
            if(datos.jug == 1){
                jug = 1;
                var lista = devuelveFichasPC(1);
                console.log(lista);
                if (lista.length > 0){
                    if(fichasJugadorXtienenJugada(lista, 1)){
                        console.log('Fichas con jugadas');
                        validas = validarDirecciones(x,y,datos.jug,validas);
                        console.log('validas '+validas);
                        if (validas == 0){
                            var nivel = 3;
                            callback({
                                success: false,
                                title: "Error",
                                message: "Movimiento invalido",
                                data: {matriz: matriz, turno: jug, nivel: nivel, ganador: 0},
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
                                        data: {matriz: matriz, turno: jug, nivel: nivel},
                                        type: "error"
                                    })
                                }
                            });
                            var temp = obtenerString(matriz);
                            console.log(datos);
                            console.log("string: "+temp);
                            request.addParameter('ID', TYPES.Int, datos.ID_Partida);
                            request.addParameter('Turno', TYPES.Int,turno);
                            request.addParameter('ID_SJ', TYPES.Int, datos.ID_SJ);    
                            request.addParameter('EstadoPartida', TYPES.Int, datos.EstadoPartida);
                            request.addParameter('Puntos_P1', TYPES.Int,devuelveFichasPC(1).length);
                            request.addParameter('Puntos_P2', TYPES.Int,devuelveFichasPC(2).length);
                            request.addParameter('MatrizJuego', TYPES.VarChar,temp);
                        
                            request.addOutputParameter('success', TYPES.Bit);
                        
                            sqlConection.callProcedure(request, function(response){
                                console.log(response);
                                
                                if (response.success == 1){
                                    console.log('SIII')
                                    matriz_respaldo = matriz;
                                    callback({
                                        success: true,
                                        error: response.error,
                                        title: "Good",
                                        message: 'Movimiento exitoso',
                                        data: {matriz: matriz, turno: jug, nivel: nivel},
                                        type: "success"
                                    })
                                }
                                else{
                                    console.log('Fuck')
                                    matriz = matriz_respaldo;
                                    callback({
                                        success: false,
                                        error: response.error,
                                        title: "Error",
                                        message: 'Movimiento invalido',
                                        data: {matriz: matriz_respaldo, turno: jug, nivel: nivel},
                                        type: "error"
                                    })
                                }
                            });


                            console.log('listo');
                            listaFichas = [];
                            setTimeout(function() {
                                
                                var fichasPC = devuelveFichasPC(2);//Esta lista almacena las fichas de la compu
                                    if(fichasPC.length > 0){
                                        console.log("prueba");
                                        if(fichasJugadorXtienenJugada(fichasPC, 2)){
                                            ///Juego de la computadora
                                            
                                            console.log('jugadasZZZZZZZZZZZZZ');
                                            for (let i = 0; i < jugadas.length; i++)
                                                console.log(jugadas[i].fichas);                                            
                                            
                                            posiblesJugadas(fichasPC,2);//Almacena las posibles jugadas de la PC
                                            console.log("prueba");
                                            //console.log("Tamano:"+jugadas.length);
                                            if (jugadas.length == 0){
                                                var nivel = 3;
                                                //console.log("La IA se quedo sin movimientos\n" + listaFichas);
                                                callback({
                                                    success: false,
                                                    title: "Error",
                                                    message: "La IA se quedo sin movimientos",
                                                    data: {matriz: matriz, turno: 1, nivel: nivel, tipo: 2, ganador: 1},
                                                    type: "error"
                                                })
                                            }
                                            else{
                                                //Ordenar la lista por puntos
                                                jugadas = ordenarLista(jugadas);
                                                var nivel = 3;
                                            // console.log("Tamano:"+jugadas.length);
                                                if(nivel == 1){
                                                    var temp = jugadas[jugadas.length-1];
                                                    for(var x = 0; x < temp.fichas.length; x++){
                                                        cambiarColorPC(temp.fichas[x].x,temp.fichas[x].y,2);
                                                    }
                                                }
                                                else if(nivel == 2){
                                                    var index = jugadas.length / 2;
                                                    var temp = jugadas[index];
                                                    for(var x = 0; x < temp.fichas.length; x++){
                                                        cambiarColorPC(temp.fichas[x].x, temp.fichas[x].y, 2);
                                                    }
                                                }
                                                else{
                                                    var temp = jugadas[0];
                                                    for(var x=0; x < temp.fichas.length; x++){
                                                        cambiarColorPC(temp.fichas[x].x, temp.fichas[x].y, 2);
                                                    }
                                                }
                                                //Si la IA tiene movimientos posibles entonces.....
                                                //console.log("Movimiento valido\n" + listaFichas);

                                                callback({
                                                    success: true,
                                                    title: "Movimiento exitoso",
                                                    data: {matriz: matriz, turno: 1, nivel: nivel, ganador: 0},
                                                    message: "Movimiento realizado",
                                                    type: "success"
                                                })
                                            }
                                        }
                                        else{
                                            var nivel = 3;
                                            //Si el jugador 2 tiene fichas pero ninguna posibilidad de jugar gaa el jugador 1
                                            //console.log("Movimiento valido\n" + listaFichas);
                                            callback({
                                                success: true,
                                                title: "IA sin fichas",
                                                data: {matriz: matriz, turno: 1, nivel: nivel, ganador: 1},
                                                message: "Movimiento realizado",
                                                type: "success"
                                            })
                                        }
                                    }
                                else{
                                    //Si la IA se quedo sin fichas gana el jugador 1
                                    //console.log("Movimiento valido\n" + listaFichas);
                                    var nivel = 3;
                                    callback({
                                        success: true,
                                        title: "IA sin fichas",
                                        data: {matriz: matriz, turno: 1, nivel: nivel, ganador: 1},
                                        message: "Movimiento realizado",
                                        type: "success"
                                    })
                                }
                            
                            }, 500);                       
                        }
                    }
                    else{
                        return false; // no puede jugar ahi
                    }                  
                }
                else{
                    //Si el jugador 1 tiene fichas pero ninguna de las fichas tiene opcion de jugar
                    //console.log("Movimiento valido\n" + listaFichas);
                    var nivel = 3;
                    callback({
                        success: true,
                        title: "Jugador 1 sin fichas",
                        data: {matriz: matriz, turno: 1, nivel: nivel, ganador: 2},
                        message: "Movimiento realizado",
                        type: "success"
                    })
                }
            }
            else{
                //Si el jugador 1 se quedo sin fichas entonces gana el jugador 2
                //console.log("Movimiento valido\n" + listaFichas);
                var nivel=3;
                callback({
                    success: true,
                    title: "Jugador 1 sin fichas",
                    data: {matriz:matriz,turno:1,nivel:nivel,ganador:2},
                    message: "Movimiento realizado",
                    type: "success"
                })
            }
        }
        else if(datos.tipo == 3){ // PC vs PC
            console.log('Estoy en nivel 3 de dificultad.');
        }      
    } catch (error) {
        console.error('ERROR: ');
        console.error(error);
    }
}

var cambiarColor = function (x,y,jug) {
    matriz[x][y] = jug;
    for (let i = 0; i < listaFichas.length; i++){ // cambiar color de fichas ganadas
        matriz[listaFichas[i].x][listaFichas[i].y] = jug;
    }
    listaFichas = []; // limpiamos lista de fichas nuevas
}
var cambiarColorPC = function (x, y, jug) {
    matriz[x][y] = jug;
}