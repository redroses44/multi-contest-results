import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Navbar from './components/layout/Navbar'
import AddEvent from './components/events/AddEvent'
import EditEvent from './components/events/EditEvent'
import Events from './components/events/Events'
import EventResults from './components/events/EventResults.js'

import PageNotFound from './components/layout/PageNotFound'


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
          <Route exact path="/event/:id" component={EventResults} />
          <Route exact path="/edit/:id/" component={EditEvent} />
          <Route component={PageNotFound} />
        </Switch>
      </Router>
    );
  }
}

export default App;
