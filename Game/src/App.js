import React, { Component } from 'react'
import { IndexRoute, Router, Route, browserHistory, Link } from 'react-router'

//App Layouts
import Tablero from './components/tablero/'
import GoogleLogin from './components/GoogleLogin/'
import Menu from './components/menu'
//Import css for the application
import './style/index.css'
class App extends React.Component {
  render() {
    return (
        <Router history={browserHistory}>
            <Route path="/" Component={GoogleLogin}>
                <IndexRoute title="Tutorial" component={GoogleLogin} />
            </Route>
            <Route path="/menu" component={Menu}></Route>
            <Route path="/tablero" component={Tablero}></Route>
        </Router>
    );
  }
}

export default App;