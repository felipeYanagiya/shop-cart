import React, {Component} from 'react';
import { Link } from 'react-router'

class Checkout extends Component {
  render() {
    return (
      <div id='checkout-container'>
          <div id='checkout-success'>
            <div className='success'></div>
            <span>Seu pedido foi enviado com sucesso! Obrigado por comprar no Walmart</span>
            <span>Número do pedido: 24242424242</span>
          </div>
          <h2> Resumo do pedido</h2>
          <div>
            Número do Pedido: 2352353253523
            <span>Atenção: Você receberá um e-mail com a confirmação e todos os detalhes
            do seu pedido. Por favor, verifique as configurações AntiSpam do seu provedor do e-mail
            </span>
          </div>
          <Link to='/' className='btn'>Voltar para lista de produtos</Link>
      </div>
    );
  }
}

export default Checkout;
