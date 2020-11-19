import React, { Component } from "react";
import { Switch, Route } from 'react-router-dom';
import routes from './routes.js'
import { Header } from './cmps/Header.jsx'


export class App extends Component {
  render() {
    return (
      <div className="app main-container">
        <Header />
        <Switch>
          {routes.map(route => <Route key={route.path} exact component={route.component} path={route.path} />)}
        </Switch>
      </div>
    )
  }
}



