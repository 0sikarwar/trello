/* eslint-disable no-restricted-globals */
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import Routes from './Routes';

const renderRoot = () => {
  ReactDOM.render(
      <HashRouter history={history} context={{}}>
        <Routes />
      </HashRouter>,
    document.getElementById('root')
  );
};

renderRoot();
  module.hot.accept('./Routes', () => {
    renderRoot();
  });
