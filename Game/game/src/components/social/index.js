import React, { Component } from 'react';

//Components
import FacebookLogin from './FacebookLogin/'
import GoogleLogin from './GoogleLogin/'
import LinkedinLogin from './LinkedinLogin/'
import Tablero from './tablero'
import Menu from '../menu'
//import config from '../../../config';
class Social extends Component{
    render(){
        return(
            <div>
                <Tablero/>
            </div>
        )
    }
}
export default Social;