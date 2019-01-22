import React, { Component } from "react";
import { Route, Switch } from 'react-router-dom';

import 'Styles/app.scss';
import Test from 'Pages/test';
import boardDetails from 'Pages/test/boardDetails';

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