import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, HashRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import Router from './Router'
import store from './store/store'
import './index.css';

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  </Provider>
  , document.getElementById('root'));