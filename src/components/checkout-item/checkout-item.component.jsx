import React, { useContext } from 'react';
// import { connect } from 'react-redux';
import { CartContext } from '../../providers/cart/cart.provider';

// import {
//   clearItemFromCart
// } from '../../redux/cart/cart.actions';

import './checkout-item.styles.scss';

const CheckoutItem = ({ cartItem }) => {
  const { name, imageUrl, price, quantity } = cartItem;
  const { addItem, removeItem, clearItemFromCart } = useContext(CartContext);
  return (
    <div className='checkout-item'>
      <div className='image-container'>
        <img src={imageUrl} alt='item' />
      </div>
      <span className='name'>{name}</span>
      <span className='quantity'>
        <div className='arrow' onClick={() => removeItem(cartItem)}>
          &#10094;
        </div>
        <span className='value'>{quantity}</span>
        <div className='arrow' onClick={() => addItem(cartItem)}>
          &#10095;
        </div>
      </span>
      <span className='price'>{price}</span>
      <div className='remove-button' onClick={() => clearItemFromCart(cartItem)}>
        &#10005;
      </div>
    </div>
  );
};

// const mapDispatchToProps = dispatch => ({
//   clearItem: item => dispatch(clearItemFromCart(item))
// });

// export default connect(
//   null,
//   mapDispatchToProps
// )(CheckoutItem);

export default CheckoutItem;
