import React, { Component } from 'react';
import axios from 'axios';

export default React.createClass({
  getInitialState() {
    return {
      nameValue: '',
      productValue: ''
    };
  },

  onNameChange(event) {
    this.setState({
        nameValue: event.target.value
      }
    );

    console.log('state', this.state);
  },

  onProductChange(event) {
    this.setState({
        productValue: event.target.value
    });
    console.log('state', this.state);
  },

  validateProduct(event) {
    event.preventDefault();

    //TODO add validation error for required keys
    if (this.state.nameValue.trim() === '' || this.state.productValue.trim() === '') {
      return;
    }

    axios.post('http://localhost:1337/parse/classes/Product', {
      'name': this.state.nameValue,
      'value': this.state.productValue
    },{
      'headers': {
        'X-Parse-Application-Id': 'web-cart',
        'Content-Type': 'application/json'
      }
    }).then((data, err) => {
      console.log('data', data);
      console.log('err', err);

      if (err) {
        //TODO add error validation
        return;
      }

      //TODO remove this deprecated call
      this.props.history.pushState('/');
    });

  },

//TODO
//center form
  render() {
    return (
      <div id="product-container">
        <h2>Cadastro de produtos</h2>
        <form onSubmit={this.validateProduct}>
          <input
            type='text'
            onChange={this.onNameChange}
            value={this.state.nameValue}
            className='name'
            placeholder='Nome do produto' />
          <br />
          <input
            type='text'
            onChange={this.onProductChange}
            value={this.state.productValue}
            className='value'
            placeholder='Valor do produto' />
          <br />
          <input type='submit' className='btn'
            onClick={this.validateProduct}
            value='Cadastrar' />
        </form>
      </div>
    );
  }
})
