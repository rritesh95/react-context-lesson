import React, { useContext } from 'react';
// import { connect } from 'react-redux';
// import { createStructuredSelector } from 'reselect';

//import { toggleCartHidden } from '../../redux/cart/cart.actions';  //not needed incase of Context API
//import { selectCartItemsCount } from '../../redux/cart/cart.selectors';

import { CartContext } from '../../providers/cart/cart.provider';

import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';

import './cart-icon.styles.scss';

const CartIcon = () => {
  const { cartItemsCount, toggleHidden } = useContext(CartContext);
  return (
    //<div className='cart-icon' onClick={toggleCartHidden}> //not needed incase of Context API
    <div className='cart-icon' onClick={toggleHidden}>
      <ShoppingIcon className='shopping-icon' />
      <span className='item-count'>{cartItemsCount}</span>
    </div>
  );
}

// const mapDispatchToProps = dispatch => ({
//   toggleCartHidden: () => dispatch(toggleCartHidden())
// });

// const mapStateToProps = createStructuredSelector({
//   itemCount: selectCartItemsCount
// });

// export default connect(
//   mapStateToProps,
// //  mapDispatchToProps
// )(CartIcon);

export default CartIcon;
