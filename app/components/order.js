import React, {Component} from 'react';
import { Link } from 'react-router'
import Cache from 'node-cache';
let cache = new Cache();

export default React.createClass({
  loadGameData() {
    let bla = cache.get('productKey', (err, value) => {
      if (!err) {
        return value;
      }
    }) || [];
    this.setState({
      data: bla
    });
  },

  // bla() {
  //   return (
  //     <button className='minus'></button>
  //     <input />
  //     <button className='plus' />
  //   );
  // },

   getInitialState: function(){
     return {data: []};
   },

   componentDidMount: function() {
     this.loadGameData();
   },


  render() {
    return (<div id='order-container'>
      <h2> Meu carrinho ({this.state.data.length} item(s))</h2>

      <ul className='header'>
        <li className='header-item --name'>item(s)</li>
        <li className='header-item --other'>preço </li>
        <li className='header-item --other'>quantidade</li>
        <li className='header-item --other'>subtotal</li>
      </ul>

      <ul>
        {this.state.data.map((user, i) => {
          return <li key={i}>{user.name}</li>
        })}
      </ul>

      <Link to='/product' className='btn product'>Cadastrar novo produto</Link>
      <Link to='/checkout' className='btn --right'>Finalizar compra</Link>

    </div>
    );
  }
});
