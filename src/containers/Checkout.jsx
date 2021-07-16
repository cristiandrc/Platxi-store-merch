import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AppContext from '../context/AppContext';
import '../style/components/Checkout.css';
import { Helmet } from 'react-helmet';

const Checkout = () => {
  const {
    state: { cart },
    removeFromCart,
  } = useContext(AppContext);

  const handleRemove = (product, index) => () => {
    removeFromCart(product, index);
  };

  const handleSumTotal = () => {
    const reducer = (accumulator, currentValue) =>
      accumulator + currentValue.price;

    const sum = cart.reduce(reducer, 0);
    return sum;
  };
  return (
    <>
      <Helmet>
        <title>Lista de pedidos - platzi</title>
      </Helmet>
      <div className="Checkout">
        <div className="Checkout-content">
          {cart.length ? <h3>Lista de Pedido</h3> : <h3>Sin pedidos...</h3>}
          {cart.map((item, index) => (
            <div key={item.id} className="Checkout-item">
              <div className="Checkout-element">
                <h4>{item.title}</h4>
                <span>{item.price}</span>
              </div>
              <button type="button" onClick={handleRemove(item, index)}>
                <i className="fas fa-trash-alt" title="Eliminar" />
              </button>
            </div>
          ))}
        </div>
        {cart.length > 0 && (
          <div className="Checkout-sidebar">
            <h3>{`Precio Total: $ ${handleSumTotal()}`}</h3>
            <Link to="/checkout/information">
              <button type="button">Continuar pedido </button>
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default Checkout;
