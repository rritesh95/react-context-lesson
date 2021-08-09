import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
// import { connect } from 'react-redux'; //not needed incase of Context API
// import { createStructuredSelector } from 'reselect'; //not needed incase of Context API

import './App.css';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import CheckoutPage from './pages/checkout/checkout.component';

import Header from './components/header/header.component';

import { auth, createUserProfileDocument } from './firebase/firebase.utils';

// import { setCurrentUser } from './redux/user/user.actions'; //not needed incase of Context API
// import { selectCurrentUser } from './redux/user/user.selectors'; //not needed incase of Context API

import CurrentUserContext from './contexts/current-user/current-user.context';

class App extends React.Component {
  constructor(){   //approach 2 using context API
    super();
 
    this.state = {
      currentUser : null
    };
  }
  
  unsubscribeFromAuth = null;

  componentDidMount() {
    // const { setCurrentUser } = this.props; //approach 1 using redux

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot => {
          // setCurrentUser({ //approach 1 using redux
          //   id: snapShot.id,
          //   ...snapShot.data()
          // });
          this.setState({ //approach 2 using context API
            currentUser : {
              id: snapShot.id,
              ...snapShot.data()
            }
          })
        });
      }

      //setCurrentUser(userAuth);
      this.setState({ //approach 2 using context API
        currentUser : userAuth
      });
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <CurrentUserContext.Provider value={this.state.currentUser}>
          <Header />
        </CurrentUserContext.Provider>
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          <Route exact path='/checkout' component={CheckoutPage} />
          <Route
            exact
            path='/signin'
            render={() =>
              this.state.currentUser ? (
                <Redirect to='/' />
              ) : (
                <SignInAndSignUpPage />
              )
            }
          />
        </Switch>
      </div>
    );
  }
}

// const mapStateToProps = createStructuredSelector({ //not needed incase of Context API
//   currentUser: selectCurrentUser
// });

// const mapDispatchToProps = dispatch => ({ //not needed incase of Context API
//   setCurrentUser: user => dispatch(setCurrentUser(user))
// });

// export default connect(  //not needed incase of Context API
//   mapStateToProps,
//   mapDispatchToProps
// )(App);

export default App;
