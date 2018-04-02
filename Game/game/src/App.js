import React, { Component } from 'react'
import { IndexRoute, Router, Route, browserHistory, Link } from 'react-router'

//App Layouts
import Social from './components/social/'
import DragDrop from './components/DragDrop/'
import Jquery from './components/Jquery/'
import Tablero from './components/social/tablero/'
import GoogleLogin from './components/social/GoogleLogin/'
//Import css for the application
import './style/index.css'
class App extends Component {
  render() {
    return (
        <Router history={browserHistory}>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/LoginGmail">Login con gmail</Link>
                </li>
                <li>
                    <Link to="/Tablero">Jugar</Link>
                </li>
            </ul>
            <Route path="/">
                <IndexRoute title="Tutorial" component={Social} />
            </Route>
            <Route path="/social" component={Social}></Route>
            <Route path="/dnd" component={DragDrop}></Route>
            <Route path="/jquery" component={Jquery}></Route>
            <Route path="/tablero" component={Tablero}></Route>
            <Route path="/LoginGmail" component={GoogleLogin}></Route>
        </Router>
    );
  }
}

export default App;