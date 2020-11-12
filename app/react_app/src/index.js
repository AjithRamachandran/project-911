import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.min.css'

import LoginPage from './pages/Login.jsx'
import HomePage from './pages/Home.jsx'

ReactDOM.render(
  <Router>
    <Route component={LoginPage} path='/login' exact></Route>
    <Route component={HomePage} path='/' exact></Route>
  </Router>,
  document.getElementById('root')
);
