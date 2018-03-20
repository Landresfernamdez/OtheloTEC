import React, { Component } from 'react'
import { IndexRoute, Router, Route, browserHistory } from 'react-router'

//App Layouts
import Social from './components/social/'
import DragDrop from './components/DragDrop/'
import Jquery from './components/Jquery/'
import Tablero from './components/social/tablero/'
//Import css for the application
import './style/index.css'
class App extends Component {
  render() {
    return (
        <Router history={browserHistory}>
            <Route path="/">
                <IndexRoute title="Tutorial" component={Social} />
            </Route>
            <Route path="/social" component={Social}></Route>
            <Route path="/dnd" component={DragDrop}></Route>
            <Route path="/jquery" component={Jquery}></Route>
            <Route path="/tablero" component={Tablero}></Route>

        </Router>
    );
  }
}

export default App;