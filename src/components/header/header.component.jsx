import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
// import { connect } from 'react-redux'; //not needed incase of Context API
// import { createStructuredSelector } from 'reselect'; //not needed incase of Context API

import { auth } from '../../firebase/firebase.utils';
import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';
// import { selectCartHidden } from '../../redux/cart/cart.selectors'; //not needed incase of Context API
// import { selectCurrentUser } from '../../redux/user/user.selectors';

import CurrentUserContext from '../../contexts/current-user/current-user.context';
import { CartContext } from '../../providers/cart/cart.provider';

import { ReactComponent as Logo } from '../../assets/crown.svg';

import './header.styles.scss';

// const Header = ({ currentUser, hidden }) => (
// const Header = ({ hidden }) => {
const Header = () => {
  const currentUser = useContext(CurrentUserContext);
  const { hidden } = useContext(CartContext);

  return (
    <div className='header'>
      <Link className='logo-container' to='/'>
        <Logo className='logo' />
      </Link>
      <div className='options'>
        <Link className='option' to='/shop'>
          SHOP
        </Link>
        <Link className='option' to='/shop'>
          CONTACT
        </Link>
        {currentUser ? (
          <div className='option' onClick={() => auth.signOut()}>
            SIGN OUT
          </div>
        ) : (
          <Link className='option' to='/signin'>
            SIGN IN
          </Link>
        )}
        <CartIcon />
      </div>
      {hidden ? null : <CartDropdown />}
    </div>
  );
};

// const mapStateToProps = createStructuredSelector({  //not needed incase of Context API
//   //currentUser: selectCurrentUser,
//   hidden: selectCartHidden
// });

// export default connect(mapStateToProps)(Header);  //not needed incase of Context API

export default Header;
