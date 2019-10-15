import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import Router from './Router'
import './index.css';

ReactDOM.render(
  <BrowserRouter>
    <Router></Router>
  </BrowserRouter>, document.getElementById('root'));
