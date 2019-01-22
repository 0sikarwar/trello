import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Routes from './Routes';

const renderRoot = () => {
  ReactDOM.render(
      <BrowserRouter history={history} context={{}}>
        <Routes />
      </BrowserRouter>,
    document.getElementById('root')
  );
};

renderRoot();
  module.hot.accept('./Routes', () => {
    renderRoot();
  });
