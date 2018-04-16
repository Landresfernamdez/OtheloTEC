/*
=================================================
=   Autor: Eliomar Antonio Rodríguez Arguedas   =
=                                               =
=   Web Service para el proyecto OthelloTEC     =
=   Ingeniería en Computación                   =
=   TEC San Carlos                              =
=================================================

===============================================================
>    Archivos donde estan las funcionalidades del juego.      <
===============================================================
*/
var gameCtrl = require('./Controladores/controlador'); // controlador del juego
/*
===============================================================================
>  Configuraciones principales del servidor, con esto escucha las peticiones  <
===============================================================================
*/
var bodyParser = require('body-parser');
var express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    port = 8080;

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use('/', express.static(__dirname + '/"Server"'));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

/*
===========================================
>  Inicio de las direcciones (Endpoints)  <
===========================================

/** tipos de consulta, implementar!
 * post insert
 * get  select
 * put  edit
 * delete   delete
 */
/*hola
========================================
>  EndPoints necesarios para el juego  < // bien todos
========================================
*/
app.post('/movimiento', gameCtrl.realizarMovimiento);
app.get('/selectPartidasDisponibles', gameCtrl.selectPartidasDisponibles);
app.post('/insertSesionJuego', gameCtrl.registrarSesionJuego);
app.post('/insertPartida', gameCtrl.insertPartida);

/*
======================================================================================
>  Pone el servidor en escucha de peticiones, lo levanta en el puerto especificado.  <
======================================================================================
*/
server.listen(port, function() {
    console.log('Servidor escuchando en el puerto: ' + port);
});