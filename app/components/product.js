import React from 'react';
import { withRouter } from 'react-router';
import axios from 'axios';

export default withRouter(React.createClass({
  getInitialState() {
    return {
      nameValue: '',
      productValue: '',
      nameField: 'field',
      valueField: 'field'
    };
  },

  onNameChange(event) {
    this.setState({
        nameValue: event.target.value,
        nameField: 'field'
      }
    );
  },

  onProductChange(event) {
    if (this.isNumberInvalid(event.target.value)) {
      this.setState({
        productValue: event.target.value,
        valueField: 'field err'
      });
    } else {
      this.setState({
          productValue: event.target.value,
          valueField: 'field'
      });
    }
  },

  isNumberInvalid(number) {
    console.log('number', number);
    console.log('parsed', parseFloat(number));

    return isNaN(parseFloat(number.replace(',', '.')));
  },

  validateProduct(event) {
    event.preventDefault();

    //TODO add tooltip error for required fields
    if (this.state.nameValue.trim() === '' || this.state.productValue.trim() === '') {
      this.setState({
        nameField: 'field err',
        valueField: 'field err'
      });
      return;
    }

    if (this.isNumberInvalid(this.state.productValue.trim())) {
      this.setState({
        valueField: 'field err'
      })
      return;
    }

    axios.post('http://localhost:1337/parse/classes/Product', {
      'name': this.state.nameValue,
      'value': this.state.productValue.replace(',', '.')
    },{
      'headers': {
        'X-Parse-Application-Id': 'web-cart',
        'Content-Type': 'application/json'
      }
    }).then((data, err) => {
      if (err) {
        //TODO add error validation
        return;
      }

      this.props.router.replace('/');
    });

  },

  render() {
    return (
      <div id="product-container">
        <h2>Cadastro de produtos</h2>
        <form className='product-form' onSubmit={this.validateProduct}>
          <input
            type='text'
            onChange={this.onNameChange}
            value={this.state.nameValue}
            className={this.state.nameField}
            placeholder='Nome do produto*' />
          <br />
          <input
            type='text'
            onChange={this.onProductChange}
            value={this.state.productValue}
            className={this.state.valueField}
            placeholder='Valor do produto*' />
          <br />
          <input type='submit' className='btn'
            onClick={this.validateProduct}
            value='Cadastrar' />
        </form>
      </div>
    );
  }
}));
