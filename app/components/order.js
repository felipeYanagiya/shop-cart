import React, {Component} from 'react';
import { Link } from 'react-router'
import axios from 'axios';
import numeral from 'numeral';

numeral.language('pt-br',
        {
          delimiters: {
            thousands: ".",
            decimal: ","
          },
          abbreviations: {
            thousand: "mil",
            million: "milhões",
            billion: "b",
            trillion: "t"
          },
          ordinal() {
            return "º";
          },
          currency: {
            symbol: "R$"
          }
        }
);

numeral.language('pt-br');

const config = {
  headers: {
    'X-Parse-Application-Id': 'web-cart',
    'Content-Type': 'application/json'
  }
};

export default React.createClass({
  loadProductData() {
    console.log('loading data');

    axios.get('http://localhost:1337/parse/classes/Product', config)
      .then((result, err) => {
      //TODO add err validation
        if (err) {
          return;
        }

        result.data.results.forEach((item) => {
          item['quantity'] = 1;
          item['subTotal'] = numeral(item.value).format('$0,0.00');
        })

        this.setState({
          data: result.data.results
        });
    });
  },

  getInitialState() {
    return {data: []};
  },

  componentDidMount() {
    this.loadProductData();
  },

  updateSubTotal(quantity, value) {
    return numeral(quantity * value).format('$0,0.00');
  },

  decrease(idx, event) {
    event.preventDefault();

    this.state.data[idx].quantity = Math.max(this.state.data[idx].quantity - 1, 1);
    this.state.data[idx].subTotal = this.updateSubTotal(this.state.data[idx].quantity, this.state.data[idx].value);

    this.setState({
      data: this.state.data
    });
  },

  increase(idx, event) {
    event.preventDefault();

    this.state.data[idx].quantity++;
    this.state.data[idx].subTotal = this.updateSubTotal(this.state.data[idx].quantity, this.state.data[idx].value);

    this.setState({
      data: this.state.data
    });
  },

  changeQuantityInput(idx, event) {
    event.preventDefault();
    const value = event.target.value;

    this.state.data[idx].quantity = value;
    this.state.data[idx].subTotal = this.updateSubTotal(this.state.data[idx].quantity, this.state.data[idx].value);

    this.setState({
      data: this.state.data
    })
  },

  render() {
    return (<div id='order-container'>
      <h2 className='order-header'> Meu carrinho ({this.state.data.length} item(s))</h2>

      <ul className='header'>
        <li className='header-item --name'>item(s)</li>
        <li className='header-item --other --price'>preço </li>
        <li className='header-item --other --qty'>quantidade</li>
        <li className='header-item --other --sub-total'>subtotal</li>
      </ul>

      {this.state.data.map((product, idx) => {
        return(
          <ul key={idx} className='item-row'>
            <li className='item-name'>
              <span>{product.name}</span>
            </li>
            <li className='item-value'>
              <span>Por {numeral(product.value).format('$0,0.00')}</span>
            </li>
            <li className='item-quantity'>
              <button className='qty-btn --minus' onClick={this.decrease.bind(this, idx)}>-</button>
              <input
                type='text'
                className='item-quantity-input'
                value={this.state.data[idx].quantity}
                onChange={this.changeQuantityInput.bind(this, idx)}
              />
              <button className='qty-btn --plus' onClick={this.increase.bind(this, idx)}>+</button>
            </li>
            <li className='item-sub-total'>
              <span>{this.state.data[idx].subTotal}</span>
            </li>
          </ul>
        );
      })}

      <section className='order-footer'>
        <div className='order-total'>
          <div className='order-sub-total'>
            <span className='sub-total-label'>
              Subtotal ({this.state.data.length} item(ns)):
            </span>
            <span className='sub-total-value'>
              {this.state.subTotal}
            </span>
          </div>
          <div className='order-total-values'>
            <span className='total-label'>
              Valor total: {numeral(this.state.total).format('$0,0.00')}
            </span>
          </div>
        </div>
      </section>

      <Link to='/product' className='btn product'>Cadastrar novo produto</Link>
      <Link to='/checkout' className='btn --right'>Finalizar compra</Link>

    </div>
    );
  }
});
