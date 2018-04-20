var matriz = [[0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,1,2,0,0,0],
    [0,0,0,2,1,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0]], listaFichas = [], jugadas=[];
  /*
  
  */            
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
/**
 *
 * @param matriz
 * Funcion se encarga de mostrar las fichas
 */
mostrarFichas = function(matriz){
    var linea = '';
    for (let i = 0; i < matriz.length; i++) {
        linea += '  '+matriz[i].x+","+matriz[i].y;
    }
    console.log(linea);
}
/**
 * Se encarga de validar la jugada arriba
 * @param x
 * @param y
 * @param jug
 * @returns {boolean}
 */
validarArriba = function (x,y,jug){
    var listaFichasNuevas = [];
    if (x == matriz[0].length-1){
        return false; // si esta en la primer posicion no puede validar hacia arriba
    }
    x++;
    while (x < matriz[0].length) {
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
/**
 * Se encarga de validar la jugada de la computadora arriba
 * @param x
 * @param y
 * @param jug
 * @returns {boolean}
 */
validarArribaPC = function (x,y,jug){
    var listaFichasNuevas = [];
    var pts=0;
    if (x == 0){
        return false; // si esta en la primer posicion no puede validar hacia arriba
    }
    x--;
    while (x > 0) {
        if (matriz[x][y] != jug & matriz[x][y] != 0) { // mientras sea la ficha del contrincante siga moviendose
            listaFichasNuevas.push({x:x,y:y});
            x--;
            pts++;
        }
        else
            break;
    }
    if (matriz[x][y] == 0 & listaFichasNuevas.length > 0){ // la ficha uno es del jugador, las otras son del enemigo y la ultima es del jugador
        listaFichasNuevas.push({x:x,y:y});
        var temp={fichas:listaFichasNuevas,pts:pts};
        console.log("entro a prueba");
        if(jug==2){
            jugadas.push(temp);
        }
        return true;
    }
    else{
        return false;
    }
}
/**
 * Se encarga de validar la jugada abajo
 * @param x
 * @param y
 * @param jug
 * @returns {boolean}
 */
validarAbajo = function (x,y,jug){ 
    var listaFichasNuevas = [];
    if (x == 0){
        return false; // si esta en la ultima posicion no puede validar hacia abajo
    }
    x--;
    while (x >=0) {
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
/**
 * Se encarga de validar la jugada de la compuadora abajo
 * @param x
 * @param y
 * @param jug
 * @returns {boolean}
 */
validarAbajoPC = function (x,y,jug){
    var listaFichasNuevas = [];
    var pts=0;
    if (x == matriz[0].length-1){
        return false; // si esta en la primer posicion no puede validar hacia arriba
    }
    x++;
    while (x < matriz[0].length-1) {
        if (matriz[x][y] != jug & matriz[x][y] != 0) { // mientras sea la ficha del contrincante siga moviendose
            listaFichasNuevas.push({x:x,y:y});
            x++;
            pts++;
        }
        else
            break;
    }
    if (matriz[x][y] == 0 & listaFichasNuevas.length > 0){ // la ficha uno es del jugador, las otras son del enemigo y la ultima es del jugador
        listaFichasNuevas.push({x:x,y:y});
        var temp={fichas:listaFichasNuevas,pts:pts};
        console.log("entro a prueba");
        if(jug==2){
            jugadas.push(temp);
        }
        return true;
    }
    else{
        return false;
    }
}
/**
 * Se encarga de validar la jugada hacia la derecha
 * @param x
 * @param y
 * @param jug
 * @returns {boolean}
 */
validarDerecha = function (x,y,jug){ 
    var listaFichasNuevas = [];
    if (y == 0){
        return false; // si esta en la ultima posicion no puede validar hacia abajo
    }
    y--;
    while (y >= 0) {
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
/**
 * Se encarga de validar la jugada de la computadora a la derecha
 * @param x
 * @param y
 * @param jug
 * @returns {boolean}
 */
validarDerechaPC = function (x,y,jug){
    var listaFichasNuevas = [];
    var pts=0;
    if (y == matriz[0].length-1){
        return false; // si esta en la primer posicion no puede validar hacia arriba
    }
    y++;
    while (y <matriz[0].length-1) {
        if (matriz[x][y] != jug & matriz[x][y] != 0) { // mientras sea la ficha del contrincante siga moviendose
            listaFichasNuevas.push({x:x,y:y});
            y++;
            pts++;
        }
        else
            break;
    }
    if (matriz[x][y] == 0 & listaFichasNuevas.length > 0){ // la ficha uno es del jugador, las otras son del enemigo y la ultima es del jugador
        listaFichasNuevas.push({x:x,y:y});
        var temp={fichas:listaFichasNuevas,pts:pts};
        console.log("entro a prueba");
        if(jug==2){
            jugadas.push(temp);
        }
        return true;
    }
    else{
        return false;
    }
}
/**
 * Se encarga de validar la jugada a la izquierda
 * @param x
 * @param y
 * @param jug
 * @returns {boolean}
 */
validarIzquierda = function (x,y,jug){
    var listaFichasNuevas = [];
    if (y == matriz[0].length-1){
        return false; // si esta en la ultima posicion no puede validar hacia abajo
    }
    y++;
    while (y<matriz[0].length) {
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
/**
 * Se encarga de validar la jugada de la computadora a la izquierda
 * @param x
 * @param y
 * @param jug
 * @returns {boolean}
 */
validarIzquierdaPC = function (x,y,jug){
    var listaFichasNuevas = [];
    var pts=0;
    if (y == 0){
        return false; // si esta en la primer posicion no puede validar hacia arriba
    }
    y--;
    while (y >0) {
        if (matriz[x][y] != jug & matriz[x][y] != 0) { // mientras sea la ficha del contrincante siga moviendose
            listaFichasNuevas.push({x:x,y:y});
            y--;
            pts++;
        }
        else
            break;
    }
    if (matriz[x][y] == 0 & listaFichasNuevas.length > 0){ // la ficha uno es del jugador, las otras son del enemigo y la ultima es del jugador
        listaFichasNuevas.push({x:x,y:y});
        var temp={fichas:listaFichasNuevas,pts:pts};
        console.log("entro a prueba");
        if(jug==2){
            jugadas.push(temp);
        }
        return true;
    }
    else{
        return false;
    }
}
/**
 * Se encarga de validar Ariba Derecha
 * @param x
 * @param y
 * @param jug
 * @returns {boolean}
 */
validarArribaDerecha = function (x,y,jug){ 
    var listaFichasNuevas = [];
    if (x == matriz[0].length - 1 | y ==0 ){
        return false; // si esta en la esquina derecha de arriba no puede validar porque se saldria de la matriz
    }
    x++;
    y--;
    while (x < matriz[0].length & y >=0 ) {
        if (matriz[x][y] != jug & matriz[x][y] != 0) { // mientras sea la ficha del contrincante siga moviendose
            listaFichasNuevas.push([x,y]);
            x++;
            y--;
        }
        else
            break;      
    }
    if 
    (matriz[x][y] == jug & listaFichasNuevas.length > 0){ // la ficha uno es del jugador, las otras son del enemigo y la ultima es del jugador
        listaFichas = listaFichasNuevas;
        return true;
    }
    else{
        listaFichas = [];
        return false;
    }    
}
/**
 * Se encarga de validar la jugada de la computadora Arriba derecha
 * @param x
 * @param y
 * @param jug
 * @returns {boolean}
 */
validarArribaDerechaPC = function (x,y,jug){
    var listaFichasNuevas = [];
    var pts=0;
    if (x == 0 | y == matriz[0].length - 1){
        return false; // si esta en la esquina derecha de arriba no puede validar porque se saldria de la matriz
    }
    x--;
    y++;
    while (x > 0 & y < matriz[0].length - 1) {
        if (matriz[x][y] != jug & matriz[x][y] != 0) { // mientras sea la ficha del contrincante siga moviendose
            listaFichasNuevas.push({x:x,y:y});
            x--;
            y++;
            pts++;
        }
        else
            break;
    }
    if (matriz[x][y] == 0 & listaFichasNuevas.length > 0){ // la ficha uno es del jugador, las otras son del enemigo y la ultima es del jugador
        listaFichasNuevas.push({x:x,y:y});
        var temp={fichas:listaFichasNuevas,pts:pts};
        console.log("entro a prueba");
        if(jug==2){
            jugadas.push(temp);
        }
        return true;
    }
    else{
        return false;
    }
}
/**
 * Se encarga de validar la jugada abajo y a la derecha
 * @param x
 * @param y
 * @param jug
 * @returns {boolean}
 */
validarAbajoDerecha = function (x,y,jug){ 
    var listaFichasNuevas = [];
    if (x == 0 | y == 0){
        return false; // si esta en la esquina derecha de abajo no puede validar porque se saldria de la matriz
    }
    x--;
    y--;
    while (x >=0 & y >=0) {
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
/**
 * Valida la jugada abajo y a la derecha de la computadora
 * @param x
 * @param y
 * @param jug
 * @returns {boolean}
 */
validarAbajoDerechaPC = function (x,y,jug){
    var listaFichasNuevas = [];
    var pts=0;
    if (x == matriz[0].length-1 | y == matriz[0].length-1){
        return false; // si esta en la esquina derecha de arriba no puede validar porque se saldria de la matriz
    }
    x++;
    y++;
    while (x < matriz[0].length - 1 & y < matriz[0].length - 1) {
        if (matriz[x][y] != jug & matriz[x][y] != 0) { // mientras sea la ficha del contrincante siga moviendose
            listaFichasNuevas.push({x:x,y:y});
            x++;
            y++;
            pts++;
        }
        else
            break;
    }
    if (matriz[x][y] == 0 & listaFichasNuevas.length > 0){ // la ficha uno es del jugador, las otras son del enemigo y la ultima es del jugador
        listaFichasNuevas.push({x:x,y:y});
        var temp={fichas:listaFichasNuevas,pts:pts};
        console.log("entro a prueba");
        if(jug==2){
            jugadas.push(temp);
        }
        return true;
    }
    else{
        return false;
    }
}
/**
 * Se encarga de validar arriba y a la izquierda
 * @param x
 * @param y
 * @param jug
 * @returns {boolean}
 */
validarArribaIzquierda = function (x,y,jug){ 
    var listaFichasNuevas = [];
    if (x == matriz[0].length-1 | y == matriz[0].length-1){
        return false; // si esta en la esquina izquierda de arriba no puede validar porque se saldria de la matriz
    }
    x++;
    y++;
    while (x < matriz[0].length & y < matriz[0].length) {
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
/**
 * Valida la jugada arriba a la izquierda de la computadora
 * @param x
 * @param y
 * @param jug
 * @returns {boolean}
 */
validarArribaIzquierdaPC = function (x,y,jug){
    var listaFichasNuevas = [];
    var pts=0;
    if (x == 0 | y == 0){
        return false; // si esta en la esquina izquierda de arriba no puede validar porque se saldria de la matriz
    }
    x--;
    y--;
    while (x > 0 & y > 0) {
        if (matriz[x][y] != jug & matriz[x][y] != 0) { // mientras sea la ficha del contrincante siga moviendose
            listaFichasNuevas.push({x:x,y:y});
            x--;
            y--;
            pts++;
        }
        else
            break;
    }
    if (matriz[x][y] == 0 & listaFichasNuevas.length > 0){ // la ficha uno es del jugador, las otras son del enemigo y la ultima es del jugador
        listaFichasNuevas.push({x:x,y:y});
        var temp={fichas:listaFichasNuevas,pts:pts};
        console.log("entro a prueba");
        if(jug==2){
            jugadas.push(temp);
        }
        return true;
    }
    else{
        return false;
    }
}
/**
 * Valida la jugada abajo a la izquierda
 * @param x
 * @param y
 * @param jug
 * @returns {boolean}
 */
validarAbajoIzquierda = function (x,y,jug){
    var listaFichasNuevas = [];
    if (x ==0  | y == matriz[0].length-1){
        return false; // si esta en la esquina izquierda de arriba no puede validar porque se saldria de la matriz
    }
    x--;
    y++;
    while (y < matriz[0].length & x >= 0) {
        if (matriz[x][y] != jug & matriz[x][y] != 0) { // mientras sea la ficha del contrincante siga moviendose
            listaFichasNuevas.push([x,y]);
            y++;
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
/**
 * Valida la jugada abajo a la izquierda de la computadora
 * @param x
 * @param y
 * @param jug
 * @returns {boolean}
 */
validarAbajoIzquierdaPC = function (x,y,jug){
    var listaFichasNuevas = [];
    var pts=0;
    if (x == matriz[0].length-1 | y == 0){
        return false; // si esta en la esquina izquierda de arriba no puede validar porque se saldria de la matriz
    }
    x++;
    y--;
    while (x < matriz[0].length-1 & y > 0) {
        if (matriz[x][y] != jug & matriz[x][y] != 0) { // mientras sea la ficha del contrincante siga moviendose
            listaFichasNuevas.push({x:x,y:y});
            x++;
            y--;
            pts++;
        }
        else
            break;
    }
    if (matriz[x][y] == 0 & listaFichasNuevas.length > 0){ // la ficha uno es del jugador, las otras son del enemigo y la ultima es del jugador
        listaFichasNuevas.push({x:x,y:y});
        var temp={fichas:listaFichasNuevas,pts:pts};
        console.log("entro a prueba");
        if(jug==2){
            jugadas.push(temp);
        }
        return true;
    }
    else{
        return false;
    }
}
/**
 * Se encarga de ordenar una lista
 * @param lista
 * @returns {*}
 */
function  ordenarLista(lista){
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
    var fichas=[];//Fichas que estan en la matriz de la PC
    for(var x=0;x<matriz[0].length;x++){
        for(var y=0;y<matriz[0].length;y++){
            if(matriz[x][y]==jugador){
                fichas.push({x:x,y:y});
            }
        }
    }
    return fichas;
}
/**
 * Se encarga de determinar si alguna de las fichas de X jugador tiene jugada alguna con el fin de determinar el ganador
 * @param fichasPC
 * @returns {boolean}
 */
function fichasJugadorXtienenJugada(fichasPC,jugador){
    console.log(fichasPC);
    for(var i=0;i<fichasPC.length;i++){
        var x = fichasPC[i].x, y = fichasPC[i].y, jug = jugador;
        //validar todas las direcciones
        //Listo
        if(validarArribaPC(x,y,jug)){
            console.log("Entro en arriba\n");
            return true;
        }
        if(validarAbajoPC(x,y,jug)){
            console.log("Entro en abajo\n");
            return true;
        }
        if(validarDerechaPC(x,y,jug)){
            console.log("Entro en derecha\n");
            return true;
        }
        if(validarIzquierdaPC(x,y,jug)){
            console.log("Entro en izquierda\n");
            return true;
        }
        if(validarArribaDerechaPC(x,y,jug)){
            console.log("Entro en arriba-derecha\n");
            return true;
        }
        if(validarAbajoDerechaPC(x,y,jug)){
            console.log("Entro en abajo-derecha\n");
            return true;
        }
        if(validarArribaIzquierdaPC(x,y,jug)){
            console.log("Entro en arriba-izquierda\n");
            return true;
        }
        if(validarAbajoIzquierdaPC(x,y,jug)){
            console.log("Entro en abajo-izquierda\n");
            return true;
        }
    }
    return false;
}
/**
 * Posibles jugadas de la computadora
 */
function posiblesJugadas(fichasPC){
    //console.log("x:"+fichasPC[0].x+"y:"+fichasPC[0].y);
    for(var i=0;i<fichasPC.length;i++){
        var x = fichasPC[i].x, y = fichasPC[i].y, jug = 2;
        //validar todas las direcciones
        //Listo
        if(validarArribaPC(x,y,jug)){
            console.log("Entro en arriba\n");
        }
        if(validarAbajoPC(x,y,jug)){
            console.log("Entro en abajo\n");
        }
        if(validarDerechaPC(x,y,jug)){
            console.log("Entro en derecha\n");
        }
        if(validarIzquierdaPC(x,y,jug)){
            console.log("Entro en izquierda\n");
        }
        if(validarArribaDerechaPC(x,y,jug)){
            console.log("Entro en arriba-derecha\n");
        }
        if(validarAbajoDerechaPC(x,y,jug)){
            console.log("Entro en abajo-derecha\n");
        }
        if(validarArribaIzquierdaPC(x,y,jug)){
            console.log("Entro en arriba-izquierda\n");
        }
        if(validarAbajoIzquierdaPC(x,y,jug)){
            console.log("Entro en abajo-izquierda\n");
        }
    }
}
/**
 * Request de la aplicacion cliente al hacer un click en el tablero
 * @param datos
 * @param callback
 * @returns {boolean}
 */
exports.validarMovimiento = function(datos,callback){
    try {
        if(datos.tipo==1){
            var x = datos.x, y = datos.y, jug = datos.jug;
            var validas = 0;
            if (matriz[x][y] == 0) // si hay un espacio en blanco puede colochar ficha
            {
                //validar todas las direcciones
                if (validarArriba(x, y, jug)) {
                    console.log("Entro en arriba\n");
                    validas++;
                    cambiarColor(x,y,jug);
                    mostrarMatriz(matriz);
                }
                if (validarAbajo(x, y, jug)) {
                    console.log("Entro en abajo\n");
                    validas++;
                    cambiarColor(x,y,jug);
                    mostrarMatriz(matriz);
                }
                if (validarDerecha(x, y, jug)) {
                    console.log("Entro en derecha\n");
                    validas++;
                    cambiarColor(x,y,jug);
                    mostrarMatriz(matriz);
                }
                if (validarIzquierda(x, y, jug)) {
                    console.log("Entro en izquierda\n");
                    validas++;
                    cambiarColor(x,y,jug);
                    mostrarMatriz(matriz);
                }
                if (validarArribaDerecha(x, y, jug)) {
                    console.log("Entro en arriba-derecha\n");
                    validas++;
                    cambiarColor(x,y,jug);
                    mostrarMatriz(matriz);
                }
                if (validarAbajoDerecha(x, y, jug)) {
                    console.log("Entro en abajo-derecha\n");
                    validas++;
                    cambiarColor(x,y,jug);
                    mostrarMatriz(matriz);
                }
                if (validarArribaIzquierda(x, y, jug)) {
                    console.log("Entro en arriba-izquierda\n");
                    validas++;
                    cambiarColor(x,y,jug);
                    mostrarMatriz(matriz);
                }
                if (validarAbajoIzquierda(x, y, jug)) {
                    console.log("Entro en abajo-izquierda\n");
                    validas++;
                    cambiarColor(x,y,jug);
                    mostrarMatriz(matriz);
                }
                if (validas == 0) {
                    var nivel = 1;
                    //console.log("Movimiento invalido\n" + listaFichas);
                    callback({
                        success: false,
                        title: "Error",
                        message: "Movimiento invalido",
                        data: {matriz: matriz, turno: jug, nivel: nivel},
                        type: "error"
                    })
                }
                else {
                    var nivel = 1;
                    var turno = 0;
                    if (jug == 1) {
                        turno = 2;
                    }
                    else {
                        turno = 1;
                    }
                    //console.log("Movimiento valido\n" + listaFichas);
                    callback({
                        success: true,
                        title: "Movimiento exitoso",
                        data: {matriz: matriz, turno: turno, nivel: nivel},
                        message: "Movimiento realizado",
                        type: "success"
                    })
                }
            }
        }
        else if(datos.tipo==2){
            if(datos.jug==1){
                var lista=devuelveFichasPC(1);
                if(lista.length>0){
                    if(fichasJugadorXtienenJugada(lista,1)){
                        var x = datos.x, y = datos.y, jug = 1;
                        var validas = 0;
                        if (matriz[x][y] == 0) // si hay un espacio en blanco puede colochar ficha
                        {
                            var x1=x,y1=y,jug1=jug;
                            //validar todas las direcciones
                            if(validarArriba(x1,y1,jug1)){
                                console.log("Entro en arriba\n");
                                validas++;
                                cambiarColor(x,y,jug);
                                mostrarMatriz(matriz);
                            }
                            var x2=x,y2=y,jug2=jug;
                            if(validarAbajo(x2,y2,jug2)){
                                console.log("Entro en abajo\n");
                                validas++;
                                cambiarColor(x,y,jug);
                                mostrarMatriz(matriz);
                            }
                            var x3=x,y3=y,jug3=jug;
                            if(validarDerecha(x3,y3,jug3)){
                                console.log("Entro en derecha\n");
                                validas++;
                                cambiarColor(x,y,jug);
                                mostrarMatriz(matriz);
                            }
                            var x4=x,y4=y,jug4=jug;
                            if(validarIzquierda(x4,y4,jug4)){
                                console.log("Entro en izquierda\n");
                                validas++;
                                cambiarColor(x,y,jug);
                                mostrarMatriz(matriz);
                            }
                            var x5=x,y5=y,jug5=jug;
                            if(validarArribaDerecha(x5,y5,jug5)){
                                console.log("Entro en arriba-derecha\n");
                                validas++;
                                cambiarColor(x,y,jug);
                                mostrarMatriz(matriz);
                            }
                            var x6=x,y6=y,jug6=jug;
                            if(validarAbajoDerecha(x6,y6,jug6)){
                                console.log("Entro en abajo-derecha\n");
                                validas++;
                                cambiarColor(x,y,jug);
                                mostrarMatriz(matriz);
                            }
                            var x7=x,y7=y,jug7=jug;
                            if(validarArribaIzquierda(x7,y7,jug7)){
                                console.log("Entro en arriba-izquierda\n");
                                validas++;
                                cambiarColor(x,y,jug);
                                mostrarMatriz(matriz);
                            }
                            var x8=x,y8=y,jug8=jug;
                            if(validarAbajoIzquierda(x8,y8,jug8)){
                                console.log("Entro en abajo-izquierda\n");
                                validas++;
                                cambiarColor(x,y,jug);
                                mostrarMatriz(matriz);
                            }
                            if (validas == 0){
                                var nivel=3;
                                //console.log("Movimiento invalido\n" + listaFichas);
                                callback({
                                    success: false,
                                    title: "Error",
                                    message: "Movimiento invalido",
                                    data: {matriz:matriz,turno:jug,nivel:nivel,ganador:0},
                                    type: "error"
                                })
                            }
                            if(validas>0){
                                console.log("prueba");
                                jugadas=[];
                                var fichasPC=devuelveFichasPC(2);//Esta lista almacena las fichas de la compu
                                if(fichasPC.length>0){
                                    console.log("prueba");
                                    if(fichasJugadorXtienenJugada(fichasPC,2)){
                                        ///Juego de la computadora
                                        posiblesJugadas(fichasPC);//Almacena las posibles jugadas de la PC
                                        console.log("prueba");
                                        //console.log("Tamano:"+jugadas.length);
                                        if (jugadas.length == 0){
                                            var nivel=3;
                                            //console.log("La IA se quedo sin movimientos\n" + listaFichas);
                                            callback({
                                                success: false,
                                                title: "Error",
                                                message: "La IA se quedo sin movimientos",
                                                data: {matriz:matriz,turno:1,nivel:nivel,tipo:2,ganador:1},
                                                type: "error"
                                            })
                                        }
                                        else{

                                            console.log("prueba");
                                            //Ordenar la lista por puntos
                                            jugadas=ordenarLista(jugadas);

                                            console.log("prueba");
                                            console.log("...........Inicio...............");
                                            for(var n=0;n<jugadas.length;n++){
                                                var temp=jugadas[n];
                                                console.log("#"+n+","+"pts:"+temp.pts+'\n');
                                                for(var m=0;m<temp.fichas.length;m++){
                                                    console.log("x:"+temp.fichas[m].x+"y:"+temp.fichas[m].y+'\n');
                                                }
                                            }
                                            console.log(".............final...............");
                                            var nivel=3;
                                            console.log("Tamano:"+jugadas.length);
                                            if(nivel==1){
                                                var temp=jugadas[jugadas.length-1];
                                                for(var x=0;x<temp.fichas.length;x++){
                                                    cambiarColorPC(temp.fichas[x].x,temp.fichas[x].y,2);
                                                }
                                            }
                                            else if(nivel==2){
                                                var index=jugadas.length/2;
                                                var temp=jugadas[index];
                                                for(var x=0;x<temp.fichas.length;x++){
                                                    cambiarColorPC(temp.fichas[x].x,temp.fichas[x].y,2);
                                                }
                                            }
                                            else{
                                                var temp=jugadas[0];
                                                for(var x=0;x<temp.fichas.length;x++){
                                                    cambiarColorPC(temp.fichas[x].x,temp.fichas[x].y,2);
                                                }
                                            }
                                            //Si la IA tiene movimientos posibles entonces.....
                                            //console.log("Movimiento valido\n" + listaFichas);
                                            callback({
                                                success: true,
                                                title: "Movimiento exitoso",
                                                data: {matriz:matriz,turno:1,nivel:nivel,ganador:0},
                                                message: "Movimiento realizado",
                                                type: "success"
                                            })
                                        }
                                    }
                                    else{
                                        var nivel=3;
                                        //Si el jugador 2 tiene fichas pero ninguna posibilidad de jugar gaa el jugador 1
                                        //console.log("Movimiento valido\n" + listaFichas);
                                        callback({
                                            success: true,
                                            title: "IA sin fichas",
                                            data: {matriz:matriz,turno:1,nivel:nivel,ganador:1},
                                            message: "Movimiento realizado",
                                            type: "success"
                                        })
                                    }
                                }
                                else{
                                    //Si la IA se quedo sin fichas gana el jugador 1
                                    //console.log("Movimiento valido\n" + listaFichas);
                                    var nivel =3;
                                    callback({
                                        success: true,
                                        title: "IA sin fichas",
                                        data: {matriz:matriz,turno:1,nivel:nivel,ganador:1},
                                        message: "Movimiento realizado",
                                        type: "success"
                                    })
                                }
                            }
                        }
                        else
                            return false; // no puede jugar ahi
                    }
                    else{
                        //Si el jugador 1 tiene fichas pero ninguna de las fichas tiene opcion de jugar
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
        }
    } catch (error) {
        console.log(error.TypeError);
    }
}
/**
 * Se encarga de cambiar el color de la fichas en el tablero
 * @param x
 * @param y
 * @param jug
 */
cambiarColor = function (x,y,jug) {
    matriz[x][y] = jug;
    for (let i = 0; i < listaFichas.length; i++){ // cambiar color de fichas ganadas
        matriz[listaFichas[i][0]][listaFichas[i][1]] = jug;
    }
    listaFichas = []; // limpiamos lista de fichas nuevas
}
cambiarColorPC = function (x,y,jug) {
    matriz[x][y] = jug;
}