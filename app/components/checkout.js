import React  from 'react';
import { Link } from 'react-router';
import axios from 'axios';

const config = {
  headers: {
    'X-Parse-Application-Id': 'web-cart',
    'Content-Type': 'application/json'
  }
};

export default React.createClass({
  getInitialState() {
    return ({
      total: 0,
      discount: 0,
      data: []
    });
  },

  componentDidMount() {
    axios.get(`http://localhost:1337/parse/classes/Order/${this.props.routeParams.orderId}`, config)
      .then((result, err) => {
      //TODO add err validation
        if (err) {
          return;
        }

        this.setState({
          data: result.data.data,
          orderNumber: result.data.orderNumber,
          totalValue: result.data.totalValue,
          totalDiscount: result.data.totalDiscount
        });
    });
  },

  render() {
    return (
      <div id='checkout-container'>
          <div className='checkout-success'>
            <div className='success'>
              <span className='success-image'></span>
              <strong><span className='success-header'>Seu pedido foi enviado com sucesso! Obrigado por comprar no Walmart</span></strong>
              <br />
              <span className='success-order'>Número do pedido: </span>
              <span className='success-value'>{this.state.orderNumber}</span>
            </div>
          </div>
          <div className='middle'>
            <h2> Resumo do pedido</h2>
            <section className='order-container'>
              <div className='order'>
              <strong><span className='order-number'>Número do Pedido: </span>
              <span className='order-value'>{this.state.orderNumber}</span>
              </strong>
              </div>
              <div className='values'>
                <span className='value-total'>Valor: {this.state.totalValue}</span> <br />
                <span className='value-discount'>Desconto: {this.state.totalDiscount}</span>
              </div>
            </section>
            <section className='order-items'>
              <div className='product'>
                <strong><span className='description'>Descrição do Produto</span></strong>
                <ul className='item-row'>
                {this.state.data.map((product, idx) => {
                  return(
                    <li key={idx} className='item-name'>
                      <span>{product.name}</span>
                    </li>
                  );
                })}
                </ul>
              </div>
              <div className='quantity'>
                <strong><span className='product-quantity'>Quantidade</span></strong>
                <ul className='item-row'>
                {this.state.data.map((product, idx) => {
                  return(
                    <li key={idx} className='item-name'>
                      <span>{product.quantity}</span>
                    </li>
                  );
                })}
                </ul>
              </div>
            </section>
          </div>
          <Link to='/' className='btn'>Voltar para lista de produtos</Link>
      </div>
    );
  }
});
