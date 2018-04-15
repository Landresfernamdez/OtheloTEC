import React, { Component } from 'react';

//Components
import GoogleLogin from './GoogleLogin/'
import Tablero from './tablero'
import Menu from './menu'
//import config from '../../../config';
class Social extends Component{
    render(){
        return(
            <div>
                <GoogleLogin
                />
            </div>
        )
    }
}
export default Social;