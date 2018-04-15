import React, { Component } from 'react'
import { IndexRoute, Router, Route, browserHistory, Link } from 'react-router'

//App Layouts
import Tablero from './components/tablero/'
import GoogleLogin from './components/GoogleLogin/'
import Menu from './components/menu'
import Social from './components/index'
//Import css for the application
import './style/index.css'
class App extends Component {
  render() {
    return (
        <Router history={browserHistory}>
            <Route path="/" Component={Social}>
                <IndexRoute title="Tutorial" component={Social} />
            </Route>
            <Route path="/social" component={Menu}></Route>
            <Route path="/tablero" component={Tablero}></Route>
            <Route path="/LoginGmail" component={GoogleLogin}></Route>
        </Router>
    );
  }
}

export default App;