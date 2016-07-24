require('./style.scss');

import React, { Component } from 'react'
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router'

import Order from './components/order.js'
import Product from './components/product.js'
import Checkout from './components/checkout.js'

class App extends Component {
  render() {
    return (
      <Router history={hashHistory}>
        <Route path='/' component={Order} />
        <Route path='/product' component={Product} />
        <Route path='/checkout' component={Checkout} />
        <Route path='*' component={NotFound} />
      </Router>
    )
  }
}

const NotFound = () => (
  <h1>404.. This page is not found!</h1>)

export default App
