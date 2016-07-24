import React, { Component } from 'react'

class Product extends Component {
  constructor(props) {
    super(props);
  }

  getInitialState() {
    return {value: ''}
  }

  onTextChange(event) {
    this.setState({value: event.target.value})
  }

  render() {
    return (
      <div id="product-container">
        <h2>Cadastro de produtos</h2>
        <input type='text'
          onChange={this.onTextChange}
          value={this.state.value}
          className='name'
          placeholder='Nome do produto' />
        <br />
        <input type='text'
          onChange={this.onTextChange}
          value={this.state.value}
          className='value'
          placeholder='Valor do produto' />
        <br />
        <input type='button' className='btn' value='Cadastrar' />
      </div>
    );
  }
}

export default Product;
