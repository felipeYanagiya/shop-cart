import React, {Component} from 'react';
import { Link, withRouter } from 'react-router'
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

export default withRouter(React.createClass({
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
          item['subTotal'] = this.formatNumber(item.value);
        })

        this.setState({
          data: result.data.results,
          subTotal: this.formatNumber(this.calculateSubTotalValue(result.data.results)),
          total: this.formatNumber(this.calculateTotalValue(result.data.results))
        });
    });
  },

  handleOrder(event) {
    event.preventDefault();

    if (this.calculateSubTotalValue(this.state.data) < 200) {
      //TODO add validation error
      return;
    }

    axios.post('http://localhost:1337/parse/classes/Order', {
      orderNumber: Math.floor(Math.random() * 10000000000),
      totalValue: this.state.total,
      totalDiscount: this.state.subTotal - this.state.total
    }, config).then((data, err) => {
      //TODO add err validation
      if (err) {
        console.log(err);
      }

      this.props.router.replace('/checkout');
    });
  },

  calculateSubTotalValue(array) {
    return array.map((item) => {
      const value = item.value || 0;

      return parseFloat(item.value) * item.quantity;
    }).reduce((prev, cur) => {
      return prev + cur;
    });
  },

  calculateTotalValue(array) {
    const subTotal = this.calculateSubTotalValue(array);

    if (subTotal >= 500 && subTotal < 600) {
      return subTotal * 0.95;
    } else if (subTotal >= 600 && subTotal < 700) {
      return subTotal * 0.90;
    } else if (subTotal > 700) {
      return subTotal * 0.85;
    }

    return subTotal;
  },

  formatNumber(number) {
    return numeral(number).format('$0,0.00');
  },

  getInitialState() {
    return {data: []};
  },

  componentDidMount() {
    this.loadProductData();
  },

  updateSubTotal(quantity, value) {
    return this.formatNumber(quantity * value);
  },

  decrease(idx, event) {
    event.preventDefault();

    this.state.data[idx].quantity = Math.max(this.state.data[idx].quantity - 1, 1);
    this.state.data[idx].subTotal = this.updateSubTotal(this.state.data[idx].quantity, this.state.data[idx].value);

    this.setState({
      data: this.state.data,
      subTotal: this.formatNumber(this.calculateSubTotalValue(this.state.data)),
      total: this.formatNumber(this.calculateTotalValue(this.state.data))
    });
  },

  increase(idx, event) {
    event.preventDefault();

    this.state.data[idx].quantity++;
    this.state.data[idx].subTotal = this.updateSubTotal(this.state.data[idx].quantity, this.state.data[idx].value);

    this.setState({
      data: this.state.data,
      subTotal: this.formatNumber(this.calculateSubTotalValue(this.state.data)),
      total: this.formatNumber(this.calculateTotalValue(this.state.data))
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
              <span>Por {this.formatNumber(product.value)}</span>
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
              Valor total:&nbsp;
            </span>
            <span className='total-value'>
              {this.formatNumber(this.state.total)}
            </span>
          </div>
        </div>
      </section>

      <section className='actions'>
        <Link to='/product' className='btn product'>Cadastrar novo produto</Link>
        <button to='/checkout' className='btn --right'
        onClick={this.handleOrder}
        >Finalizar compra</button>
      </section>

    </div>
    );
  }
}));
