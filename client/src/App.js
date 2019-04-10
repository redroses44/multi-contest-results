import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Navbar from './components/layout/Navbar'
import AddEvent from './components/events/AddEvent'
import Events from './components/events/Events'


class App extends Component {
  render() {
    return (
      <Router>
        <React.Fragment>
          <Navbar />
        </React.Fragment>
        <Switch>
          <Route exact path="/add" component={AddEvent} />
          <Route exact path="/" component={Events} />
        </Switch>
      </Router>
    );
  }
}

export default App;
