import React, { Component } from 'react';
import  axios  from 'axios';
import 'react-addons-transition-group';
import { Form,FormGroup,Col,ControlLabel,FormControl,Button,Row ,Image,Modal} from 'react-bootstrap';
//Assets
import google from './google.png';
import logo from './logo.png';
import config from './config';
//const { Alertify } = require('react-alertify-js')
// place where you'd like in your app 
//module.exports = () => <Alertify />;
/*
*/
class GoogleLogin extends Component{
    constructor(props) {
        super(props)
        this.state={
            correo:''
        }
    }
    
    componentDidMount=()=>{
        (function() {
            var e = document.createElement("script");
            e.type = "text/javascript";
            e.async = true;
            e.src = "https://apis.google.com/js/client:platform.js?onload=gPOnLoad";
            var t = document.getElementsByTagName("script")[0];
            t.parentNode.insertBefore(e, t)
        })();    
    }
    //Triggering login for google
    googleLogin = () => {
        let response = null;
        window.gapi.auth.signIn({
            callback: function(authResponse) {
                this.googleSignInCallback(authResponse)
            }.bind( this ),
            clientid: config.google, //Google client Id
            cookiepolicy:"single_host_origin",
            requestvisibleactions: "http://schema.org/AddAction",
            scope: "https://www.googleapis.com/auth/plus.login email"
        });
    }
    googleSignInCallback = (e) => {
        console.log( e )
        if (e["status"]["signed_in"]) {
            window.gapi.client.load("plus", "v1", function() {
                if (e["access_token"]) {
                    this.getUserGoogleProfile( e["access_token"] )
                } else if (e["error"]) {
                    console.log('Import error', 'Error occured while importing data')
                }
            }.bind(this));
        } else {
            console.log('Oops... Error occured while importing data')
        }
    }

    getUserGoogleProfile = accesstoken => {
        var e = window.gapi.client.plus.people.get({
            userId: "me"
        });
        e.execute(function(e) {
            if (e.error) {
                console.log(e.message);
                console.log('Import error - Error occured while importing data')
                alert("error");
                return
            
            } else if (e.id) {
                console.log( e.emails[0].value);
                console.log(e.displayName);
                //Profile data
                //alert("Successfull login from google : "+ e.displayName )
                   axios.post('http://localhost:8080/validaCorreo',{
                            correo:e.emails[0].value
                            })
                            .then(result => {
                                console.log(result);
                                if(result.data.success==true){
                                    localStorage.setItem("correo", e.emails[0].value);
                                    window.location.href=window.location.href+'menu';
                                    alert("Bienvenido");
                                }
                                else{ 
                                    this.setState({correo:e.emails[0].value});
                                    document.getElementById("myDialog").showModal();
                                }
                            })
                            .catch(error=> {
                            console.log(error);
                            });
                return;
            }
        }.bind(this));
    }
    validarCredenciales=()=>{
        var mail=this.textCorreo.value;
        var pass= this.textClave.value;
        axios.post('http://localhost:8080/login', {
            correo: mail,
            clave: pass,
            })
            .then(result => {
                console.log(result);
                if(result.data.success==true){
                    localStorage.setItem("correo", this.state.correo);
                    window.location.href=window.location.href+'menu';
                    alert("Bienvenido");
                }
                else{
                    alert("Credenciales incorrectas, si desea crearse una cuenta debe ingresar con gmail");
                }
            })
            .catch(error=> {
            console.log(error);
            });
    }
    cerrarDialog=()=>{
        document.getElementById('myDialog').close(); 
        console.log("Mi correo es:"+this.state.correo);
        axios.post('http://localhost:8080/insertarUsuario',{
                                            correo:this.state.correo,
                                            clave:this.textPassword.value,
                                            nickname:this.textNickname.value
                                            })
                                            .then(result => {
                                                console.log(result);
                                                if(result.data.success==true){
                                                    localStorage.setItem("correo", this.state.correo);
                                                    alert("Se ha registrado con exito");
                                                    window.location.href=window.location.href+'menu';
                                                }
                                                else{
                                                    alert("Sucedio un error y no se inserto");
                                                    }
                                                }
                                            )
                                            .catch(error=> {
                                            console.log(error);
                                            });
    }        
    render(){
        var divStyle = {
        marginTop:'10%',
        marginLeft:'30%',
        marginRight:'30%',
        marginBottom:'10%'
        };
        var divContainer = {
            displayName:'inline-block'
        };
            return(
                <div style={divStyle}>
                    <html lang="en">
                    <head>
                    <meta charset="UTF-8"></meta>
                    <title> S3 Infrequent Access Calculator</title>
                    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css"></link>
                    <script src="https://code.jquery.com/jquery-2.2.4.min.js"></script>
                    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>
                    <script src="./alertify/alertify.js"></script>
                    <link rel="stylesheet" type="text/css" href="./alertify/css/alertify.css"></link>
                    <link rel="stylesheet" type="text/css" href="./alertify/css/themes/default.css"></link>
                    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"></link>
                    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
                    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
                    </head>
                    <body>
                    <Form horizontal>
                        <Image src={logo} circle />
                        <FormGroup controlId="formHorizontalEmail">
                            <Col componentClass={ControlLabel} sm={2}>
                            Email
                            </Col>
                            <Col sm={10}>
                            <FormControl  inputRef={input => this.textCorreo = input} type="email" placeholder="Email" className='amount'/>
                            </Col>
                        </FormGroup>

                        <FormGroup controlId="formHorizontalPassword">
                            <Col componentClass={ControlLabel} sm={2}>
                            Password
                            </Col>
                            <Col sm={10}>
                            <FormControl  inputRef={input => this.textClave = input} type="password" placeholder="Password" className='amount'/>
                            </Col>
                        </FormGroup>
                        <FormGroup>
                            <div style={divContainer}>
                                <Button  onClick={()=>this.validarCredenciales()}>Sign in</Button>
                                <img src={google} title="google login" alt="google" onClick={ () => this.googleLogin() }/>
                            </div>
                        </FormGroup>
                    </Form>;
                    <dialog id="myDialog">
                    <FormControl  inputRef={input => this.textPassword = input} type="text" placeholder="Type your password" className='amount'/>
                    <FormControl  inputRef={input => this.textNickname = input} type="text" placeholder="Type your nickname" className='amount'/>
                    <Button  onClick={()=>this.cerrarDialog()}>Ok</Button>
                    </dialog>
                    </body>
                    </html>
                </div>
            )
    }
}

export default GoogleLogin;