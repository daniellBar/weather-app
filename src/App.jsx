import React, { Component } from "react";
import { Switch, Route } from 'react-router-dom';
import { withRouter } from 'react-router-dom'
import routes from './routes.js'
import { Header } from './cmps/Header.jsx'

class _App extends Component {

  render() {
    const isHomepage = this.props.location.pathname === "/";
    return (
      <div className="app main-container">
        <Header isHomepage={isHomepage} />
        <Switch>
          {routes.map(route => <Route key={route.path} component={route.component} path={route.path} />)}
        </Switch>
      </div>
    )
  }
}


export const App = withRouter(_App);

