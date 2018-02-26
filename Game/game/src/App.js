import React, { Component } from 'react';
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import  {Redirect} from 'react-router-dom';
// or
import { GoogleLogin } from 'react-google-login';
import logo from './logo.svg';

import './App.css';
import {PostData} from 'services/PostData';

class App extends Component {
    constructor(props){
        super(props);
        this.stats={
            redirectToReferrer:false
        }
        this.singup=this.singup.bind(this);
    }
    singup(res,type){
        let PostData;
        if(type==='facebook' && res.email){
            PostData={name:res.name,provider:type,email:res.email,provider_id:res.id,token:res.accessToken,provider_pic:res.provider_pic}
        }
        if(type==='google' && res.w3.U3){
            PostData={name:res.w3.id,provider:type,email:res.w3.U3,provider_id:res.El,token:res.Zi.access_token,provider_pic:res.w3.PAA}
        }
        PostData('login',this.state).then((result) => {
            let responseJson = result;
            if(responseJson.userData){
                sessionStorage.setItem('userData',JSON.stringify(responseJson));
                this.setState({redirectToReferrer: true});
            }
    });
    }
    render(){
        if(this.state.redirectToReferrer){
            return (<Redirect to={'/home'}/>);
        }
      const responseFacebook = (response) => {
          console.log(response);
          this.singup(response,'facebook')
      }
      const responseGoogle = (response) => {
          console.log(response);
          this.singup(response,'google')
      }
    return (
      <div className="App">
        <header className="App-header">
            <GoogleLogin
                clientId="259726881032-iqe1f86o2nf9g9c38scng6ugpnkq23te.apps.googleusercontent.com"
                buttonText="Login"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
            />
            <FacebookLogin
                appId="185992235337870"
                autoLoad={true}
                fields="name,email,picture"
                onClick={componentClicked}
                callback={responseFacebook} />
        </header>
      </div>
    );
  }
}
