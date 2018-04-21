/**
 * Created by Andres on 3/29/2018.
 */
import React, { Component } from 'react';
import 'react-addons-transition-group';
import {Tabs,Tab,FormControl,ListGroup,ListGroupItem,Modal,Button} from 'react-bootstrap';
import GoogleLogin from '.././GoogleLogin/index';
import "./index.css";
import axios from 'axios';
import othrules2 from './othrules2.gif';
import othrules3 from './othrules3.gif';
import othrules4 from './othrules4.gif';
import othrules5 from './othrules5.gif';
import othrules6 from './othrules6.gif';
import ReactDOM from 'react-dom';
import {
    Route,
    NavLink,
    HashRouter
  } from "react-router-dom";
class  Menu extends  Component{
    constructor(props){
        super(props)
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.state={
            sesiones:[],
            missesiones:[],
            filtro:'1',
            show:false,
            partidas:[{PuntosP1:0,PuntosP1:0,winner:0}]
        }
    }
    handleClose(){
        this.setState({ show: false });
      }
      handleShow(){
        this.setState({ show: true });
      }
    handleSelect=(selectedKey)=>{
        alert(`selected ${selectedKey}`);
         }
    insertSession=()=>{
        var partidas=document.getElementById("inpPartidas").value;
        var n=document.getElementById("inputN").value;
        var color=document.getElementById("colorFicha").value;
        var tipo=document.getElementById("seltipo").value;
        var nivel=document.getElementById("selnivel").value;
        if((parseInt(n)%2)==0){
            if(tipo=="Multiplayer"){
                tipo=2;
            }
            if(tipo=="Individual game"){
                tipo=1; 
            }
            if(tipo=="PC vs PC"){
                tipo=3;
            }
            var correo=localStorage.getItem("correo");
            axios.post('http://localhost:8080/agregarSesion',{
                                                correo:correo,
                                                partidas:partidas,
                                                n:n,
                                                color:color,
                                                tipo:tipo,
                                                nivel:nivel
                                                })
                                                .then(result => {
                                                    console.log(result);
                                                    if(result.data.success==true){
                                                        alert("The session was create with success");
                                                    }
                                                    else{
                                                        alert("Error the ssesion was not create with success");
                                                        }
                                                    }
                                                )
                                                .catch(error=> {
                                                console.log(error);
                                                });
        }
        else{
            alert("The n must be a even number");
        }
    }
    recuperaraSesiones=()=>{
        axios.get('http://localhost:8080/selectSesionesJuegoDisponibles')
            .then(response=>{
                //localStorage.setItem("sesiones",JSON.stringify(response.data));
                this.setState({sesiones:response.data});
            })
            .catch(function (error) {
                console.log(error);
                return error.data
            })
        } 
    recuperaramisSesiones=()=>{
            var filtro="";
            if(document.getElementById("selfiltro")==null){
                filtro="3"
            }
            else if(document.getElementById("selfiltro").value=="Activas"){
                filtro="1";
            }
            else if(document.getElementById("selfiltro").value=="Avaibles"){
                filtro="3";
            }
            else{
                filtro="2";
            }
            //console.log(filtro);
            var request={
                correo:localStorage.getItem("correo"),
                filtro:filtro
                }
            //console.log(request);    
            axios.post('http://localhost:8080/misSesiones',request).then(response=>{
                    //localStorage.setItem("sesiones",JSON.stringify(response.data));
                    //console.log(response);
                    this.setState({filtro:filtro,sesiones:response.data.data});
                })
                .catch(function (error) {
                    //console.log(error);
                    return error.data
                })
            }       
    unirseSesion=(e)=>{
        e.preventDefault();
        const  {param}=e.target.dataset;
        var data=JSON.parse(param);
        console.log("prueba")
        console.log(data)
        if(this.state.filtro=='3'){
            axios.post('http://localhost:8080/putUsuarioasesiondeJuego',{
                correo:data.correo,
                color:data.color,
                idsesion:data.idsesion
                })
                .then(result => {
                    console.log(result);
                    if(result.data.success==true){

                    }
                    else{
                        alert("Select other color");
                        }
                    }
                )
                .catch(error=> {
                console.log(error);
                });
        }
        else{
            alert("Select a session avaible");
        }
    }
    
    verdetalles=(e)=>{
        e.preventDefault();
        const  {param}=e.target.dataset;
        var data=JSON.parse(param);
            axios.post('http://localhost:8080/detallesSesion',{
                id_sesion:data.idsesion
                })
                .then(result => {
                    console.log(result);
                    if(result.data.success==true){
                        this.setState({partidas:result.data.data})
                        this.handleShow();
                    }
                    else{
                        alert("Select a game desactive")
                        }
                    }
                )
                .catch(error=> {
                console.log(error);
                });
    }     
    render(){
        this.recuperaramisSesiones();
        //this.recuperaraSesiones();
        //this.recuperaramisSesiones();
        const divS={textAlign:'justify'
                    ,marginLeft:'15%',
                    marginRight:'15%',
                    background:'white'
                }
        const divS1={
                    textAlign:'justify'
                    ,marginLeft:'30%',
                    marginRight:'15%',
                    background:'white',
                    display:'block',
                    marginTop:'15%'
                }
        //Sesiones habilitadas
        const filas=[];
        var sesiones=this.state.sesiones;
       // console.log("mis sesiones habilitadas");
        //console.log(sesiones);
        var mail=localStorage.getItem("correo");
        //console.log(mail);
        for(var x=0;x<sesiones.length;x++){
                var nickname="Yo";
                if(this.state.filtro=='3'){
                    nickname=sesiones[x].Nickname;
                }
                filas[x]=<ListGroupItem><b>Creator: </b>{nickname}      <b>N of the board:</b> {sesiones[x].N_Tablero}      <b>Level:</b> {sesiones[x].NivelDificultad}
                <b>Games:</b> {sesiones[x].NumPartidas}   
                <Button  data-param={JSON.stringify({idsesion:sesiones[x].ID_SJ,correo:mail,color:document.getElementById("inputColorf2").value})}bsStyle="primary" bsSize="small" onClick={this.unirseSesion}>
                Join</Button>     <Button data-param={JSON.stringify({idsesion:sesiones[x].ID_SJ})} bsStyle="primary" bsSize="small" onClick={this.verdetalles}>Details</Button></ListGroupItem>
        }
        var partidas=this.state.partidas;
        const filasPartidas=[];
        for(var x=0;x<partidas.length;x++){
            filasPartidas[x]=<ListGroupItem>{x+1}. <b>Player one points: </b>{partidas[x].PuntosP1}   <b>Player two points:</b> {partidas[x].PuntosP2} <b>Winner:</b>{partidas[x].winner}</ListGroupItem>
        }
        return(
            <html>
                    <head>
                    <title>Othello TEC</title>    
                    <meta charset="UTF-8"></meta>
                    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"></link>
                    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
                    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
                    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css"></link>
                    <script src="https://code.jquery.com/jquery-2.2.4.min.js"></script>
                    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>
                    </head>
                    <body>
                    <Tabs defaultActiveKey={2} id="uncontrolled-tab-example">
                        <Tab eventKey={1} title="Roules about othello">
                        <div style={divS}>
                        <h1>Rules in othello</h1>
                        <p>1. Black always moves first. 
                        </p><p>2. If on your turn you cannot outflank and flip at least one opposing 
                        disc, your turn is forfeited and your opponent moves again. However, if a 
                        move is available to you, you may not forfeit your turn. 
                        </p><p>3. A disc may outflank any number of discs in one or more rows in any 
                        number of directions at the same time - horizontally, vertically or 
                        diagonally. (A row is defined as one or more discs <i>in a continuous 
                        straight line </i>). See Figures 2 and 3. 
                        </p>
                        <p><img height="131" src={othrules2} width="174"></img> Figure 2 
                        <img height="131" src={othrules3} width="171"></img> Figure 3 
                        </p>
                        <p>4. You may not skip over your own colour disc to outflank an opposing 
                        disc. (See Figure 4). 
                        </p><p><img height="130" src={othrules4} width="206"></img> Figure 4 
                        </p><p>5. Discs may only be outflanked as a direct result of a move and must 
                        fall in the direct line of the disc placed down. (See Figure 5 and 6). 
                        </p><p><img height="131" src={othrules5} width="184"></img> Figure 5 
                        <img height="130" src={othrules6} width="219"></img> Figure 6 
                        </p><p>6. All discs outflanked in any one move must be flipped, even if it is 
                        to the player's advantage not to flip them at all. 
                        </p><p>7. A player who flips a disc which should not have been turned may 
                        correct the mistake as long as the opponent has not made a subsequent 
                        move. If the opponent has already moved, it is too late to change and the 
                        disc(s) remain as is. 
                        </p><p>8. Once a disc is placed on a square, it can never be moved to another 
                        square later in the game. 
                        </p><p>9. If a player runs out of discs, but still has an opportunity to 
                        outflank an opposing disc on his or her turn, the opponent must give the 
                        player a disc to use. (This can happen as many times as the player needs 
                        and can use a disc). 
                        </p><p>10. When it is no longer possible for either player to move, the game 
                        is over. Discs are counted and the player with the majority of his or her 
                        colour discs on the board is the winner. 
                        </p>
                        </div>
                        </Tab>
                        <Tab eventKey={2} title="Create session">
                           <div style={divS1}> 
                           <b>Select the number of games</b><input type="number" min="1" id="inpPartidas"></input><br></br>
                           <b>Select the N of the board</b><input type="number" min="6"id="inputN"></input><br></br>
                           <b>Select the color of your game piece</b><input type="color" id="colorFicha"></input><br></br>
                           <b>Select the type of game</b><select class="form-control" id="seltipo">
                            <option>Multiplayer</option>
                            <option>Individual game</option>
                            <option>PC vs PC</option>
                           </select><br></br>
                           <b>Select the level   </b><select class="form-control" id="selnivel">
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                           </select><br></br>
                            <Button bsStyle="primary" bsSize="small" class="btn btn-primary" onClick={this.insertSession}>Crear sesion de juego</Button>
                           </div>
                        </Tab>
                        <Tab eventKey={3} title="My sessions" >
                        <b>Select a color of your chip and after select the game avaible</b><input type="color" id="inputColorf2"></input><br></br>
                        <b>Select the type of session: </b><select class="form-control" id="selfiltro">
                            <option >Activas</option>
                            <option >Inactivas</option>
                            <option>Avaibles</option>
                           </select>
                            <ListGroup>
                                {filas}
                            </ListGroup>
                        </Tab>
                    </Tabs>;
                    <Modal show={this.state.show} onHide={this.handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Modal heading</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <ListGroup>
                                {filasPartidas}
                            </ListGroup>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={this.handleClose}>Close</Button>
                        </Modal.Footer>
                    </Modal>
                        </body>
                        </html>
        )
    }
    }
export default Menu;