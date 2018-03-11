var matriz = [[0,0,0,0,0,0],
              [0,0,0,0,0,0],
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

validarArriba = function (matriz,x,y) {
    
}
/**
 * 
 */
movimientoValido = function (x,y,jug,dir){
    switch (dir) {
        case 0:console.log('arriba');
            if (x > 0)
                if (matriz[x-1][y] == jug | matriz[x-1][y] == 0) // arriba
                    return false;
            break;
        case 1:
            if (x < matriz.length)
                if (matriz[x+1][y] == jug | matriz[x+1][y] == 0) // abajo
                    return false;
            break;
        case 2:
            if (y < matriz.length)
                if (matriz[x][y+1] == jug | matriz[x][y+1] == 0) // derecha
                    return false;
            break;
        case 3:
            if (y > 0)
                if (matriz[x][y-1] == jug | matriz[x][y-1] == 0) // izquierda
                    return false;
            break;
        case 4:
            if (x > 0 & y < matriz.length)
                if (matriz[x-1][y+1] == jug | matriz[x-1][y+1] == 0) // derecha-arriba
                    return false;
            break;
        case 5:
            if (x < matriz.length & y < matriz.length)
                if (matriz[x+1][y+1] == jug | matriz[x+1][y+1] == 0) // derecha-abajo
                    return false;
            break;
        case 6:
            if (x > 0 & y > 0)
                if (matriz[x-1][y-1] == jug | matriz[x-1][y-1] == 0) // izquierda-arriba
                    return false;
            break;
        case 7:
            if (x < matriz.length & y > 0)
                if (matriz[x+1][y-1] == jug | matriz[x+1][y-1] == 0) // izquierda-abajo
                    return false;
            break;
    }
}
/**
 * Funcion encargada de verificar si a la derecha de la ficha que se acaba de poner hay fichas por voltear (ganadas con la jugada)
 * X de donde esta la ficha puesta
 * Y de donde esta la ficha puesta
 * jug numero de jugador que realizo la jugada
 * dir -> 0 arriba, 1 abajo, 2 derecha, 3 izquierda, 4 arriba-derecha, 5 abajo-derecha, 6 arriba-izquierda, 7 abajo-izquierda
 */
validaMovimientos = function(x, y, jug, dir){
    try {        
        listaFichasNuevas.push([x,y]);
        
        while ((x >= 0 & ( y >= 0 | y < matriz.length)) | (x < matriz.length & ( y >= 0 | y < matriz.length))){
            if (matriz[x][y] != jug & matriz[x][y] != 0){ // 0 significa espacio
                listaFichasNuevas.push([x,y]);
                switch (dir) {
                    case 0: // arriba
                        x--;
                        break;
                    case 1: // abajo
                        x++;
                        break;
                    case 2: // derecha
                        y++;
                        break;
                    case 3: // izquierda
                        y--;
                        break;
                    case 4: // derecha-arriba
                        x--;
                        y++;
                        break;
                    case 5: // derecha-abajo
                        x++;
                        y++;
                        break;
                    case 6: // izquierda-arriba
                        x--;
                        y--;
                        break;
                    case 7: // izquierda-abajo
                        x++;
                        y--;
                        break;
                }
            }
            else // encontro un 0 o un jug
                break;
        }

        if (matriz[x][y] == jug){
            listaFichasNuevas.push([x,y]);
            return true;
        }
        else
            return false;

    } catch (error) {
        console.log('A ocurrido el siguiente error: ' + error);
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
validarDerecha = function (x,y,jug){ // listo
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
validarIzquierda = function (x,y,jug,dir){ // listo
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
validarArribaDerecha = function (x,y,jug,dir){
    listaFichasNuevas.push([x,y]);

    return listaFichasNuevas;    
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
console.log(validarIzquierda(2,4,1));
console.log(JSON.stringify(listaFichasNuevas));