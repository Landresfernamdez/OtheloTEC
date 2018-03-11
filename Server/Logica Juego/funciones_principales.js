var matriz = [[0,0,0,0,0,0],
              [0,0,0,0,1,0],
              [0,0,1,2,0,0],
              [0,0,2,1,0,0],
              [0,0,0,0,0,0],
              [0,0,0,0,0,0],], listaFichasNuevas = [];
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
exports.obtenerString = function(matriz){
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


validarArriba = function (x,y,jug,dir){ //listo
    if (x == 0){ 
        return false; // si esta en la primer posicion no puede validar hacia arriba
    }
    listaFichasNuevas.push([x,y]);// primer ficha
    x--;
    while (x > 0) { 
        if (matriz[x][y] != jug & matriz[x][y] != 0) { // mientras sea la ficha del contrincante siga moviendose
            listaFichasNuevas.push([x,y]);
            x--;
        }
        else
            break;      
    }
    if (matriz[x][y] == jug & listaFichasNuevas.length > 1){ // la ficha uno es del jugador, las otras son del enemigo y la ultima es del jugador
        listaFichasNuevas.push([x,y]); // la ficha del jugador
        return true;
    }
    else{
        //limpiar lista
        return false;
    }
}
validarAbajo = function (x,y,jug,dir){ //listo
    if (x == matriz.length - 1){ 
        return false; // si esta en la ultima posicion no puede validar hacia abajo
    }
    listaFichasNuevas.push([x,y]);// primer ficha
    x++;
    while (x < matriz.length - 1) {
        if (matriz[x][y] != jug & matriz[x][y] != 0) { // mientras sea la ficha del contrincante siga moviendose
            listaFichasNuevas.push([x,y]);
            x++;
        }
        else
            break;      
    }
    if (matriz[x][y] == jug & listaFichasNuevas.length > 1){ // la ficha uno es del jugador, las otras son del enemigo y la ultima es del jugador
        listaFichasNuevas.push([x,y]); // la ficha del jugador
        return true;
    }
    else{
        //limpiar lista
        return false;
    }
}
validarDerecha = function (x,y,jug){ //listo
    if (y == matriz.length - 1){ 
        return false; // si esta en la ultima posicion no puede validar hacia abajo
    }
    listaFichasNuevas.push([x,y]);// primer ficha
    y++;
    while (y < matriz.length - 1) {
        if (matriz[x][y] != jug & matriz[x][y] != 0) { // mientras sea la ficha del contrincante siga moviendose
            listaFichasNuevas.push([x,y]);
            y++;
        }
        else
            break;      
    }
    if (matriz[x][y] == jug & listaFichasNuevas.length > 1){ // la ficha uno es del jugador, las otras son del enemigo y la ultima es del jugador
        listaFichasNuevas.push([x,y]); // la ficha del jugador
        return true;
    }
    else{
        //limpiar lista
        return false;
    }
}
validarIzquierda = function (x,y,jug,dir){ //listo
    if (y == 0){ 
        return false; // si esta en la ultima posicion no puede validar hacia abajo
    }
    listaFichasNuevas.push([x,y]);// primer ficha
    y--;
    while (y > 0) {
        if (matriz[x][y] != jug & matriz[x][y] != 0) { // mientras sea la ficha del contrincante siga moviendose
            listaFichasNuevas.push([x,y]);
            y--;
        }
        else
            break;      
    }
    if (matriz[x][y] == jug & listaFichasNuevas.length > 1){ // la ficha uno es del jugador, las otras son del enemigo y la ultima es del jugador
        listaFichasNuevas.push([x,y]); // la ficha del jugador
        return true;
    }
    else{
        //limpiar lista
        return false;
    }
}
validarArribaDerecha = function (x,y,jug,dir){ //listo
    if (x == 0 | y == matriz.length - 1){ 
        return false; // si esta en la esquina derecha de arriba no puede validar porque se saldria de la matriz
    }
    listaFichasNuevas.push([x,y]);// primer ficha
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
    if (matriz[x][y] == jug & listaFichasNuevas.length > 1){ // la ficha uno es del jugador, las otras son del enemigo y la ultima es del jugador
        listaFichasNuevas.push([x,y]); // la ficha del jugador
        return true;
    }
    else{
        //limpiar lista
        return false;
    }    
}
validarAbajoDerecha = function (x,y,jug,dir){
    listaFichasNuevas.push([x,y]);
    
    return listaFichasNuevas;
}
validarArribaIzquierda = function (x,y,jug,dir){
    listaFichasNuevas.push([x,y]);
    
    return listaFichasNuevas;
}
validarAbajoIzquierda = function (x,y,jug,dir){
    listaFichasNuevas.push([x,y]);
    
    return listaFichasNuevas;
}

// despues de dar click viene aqui
validarMovimiento = function(x,y,jug){
    var validas = 0;
    if (matriz[x][y] == 0) // si hay un espacio en blanco
    {
        matriz[x][y] = jug; // realizar la jugada
        //validar todas las direcciones
        //
        //
        if (validas == 0) 
            return false;
        else
            return true;
    }
    else
        return false; // no puede jugar ahi
}

cambiarColor = function (jug, dir) {
    
}
console.log(validarArribaDerecha(2,3,1));
console.log(JSON.stringify(listaFichasNuevas));