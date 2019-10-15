import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import Router from './Router'
import store from './store'
import './index.css';

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Router></Router>
    </BrowserRouter>
  </Provider>, document.getElementById('root'));
