import React, { Component } from "react";
import { Route, Switch } from 'react-router-dom';

import './styles/app.scss';
import Test from './pages/test';
import boardDetails from './pages/test/boardDetails';

export default class Routes extends Component {
  render() {
    return (
        <Switch>
          <Route exact path="/" component={Test} />
          <Route exact path = "/boardDetails/:id" component={boardDetails}/>
        </Switch>
    )
  }
}