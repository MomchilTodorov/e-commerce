import React, { Component } from 'react';
import { connect } from 'react-redux';
import history from '../../history';
import {
  signIn,
  signOut,
  setProducts,
  setDiscountedProducts
} from '../../actions';

class GoogleAuth extends Component {
  componentDidMount() {
    window.gapi.load('client:auth2', () => {
      window.gapi.client
        .init({
          clientId:
            '254406641136-lc6b8b252avd7n3261f0b81m5qvkta2d.apps.googleusercontent.com',
          scope: 'email'
        })
        .then(() => {
          this.auth = window.gapi.auth2.getAuthInstance();
          this.onAuthChange(this.auth.isSignedIn.get());
          this.auth.isSignedIn.listen(this.onAuthChange);
        });
    });
  }

  onAuthChange = isSignedIn => {
    if (isSignedIn) {
      this.props.signIn();
      this.props.setDiscountedProducts();
    } else {
      this.props.signOut();
      this.props.setProducts();
    }
  };

  onSignInClick = () => {
    this.auth.signIn();
  };

  onSignOutClick = () => {
    this.auth.signOut();

    setTimeout(function() {
      history.push('/');
    }, 50);
  };

  renderAuthButton() {
    if (this.props.isSignedIn === null) {
      return null;
    } else if (this.props.isSignedIn) {
      return (
        <button
          id="signOut"
          onClick={this.onSignOutClick}
          className="ui red google button"
        >
          <i className="google icon" />
          Sign Out
        </button>
      );
    } else {
      return (
        <button
          id="signIn"
          onClick={this.onSignInClick}
          className="ui red google button ui animated button"
        >
          <span className="hidden content">
            <i className="google icon" />
            Sing In With Google
          </span>
          <span className="visible content">
            <i className="google icon" />
            Apply Product Discount
          </span>
        </button>
      );
    }
  }

  render() {
    return <div>{this.renderAuthButton()}</div>;
  }
}

const mapStateToProps = state => {
  return { isSignedIn: state.auth.isSignedIn };
};

export default connect(
  mapStateToProps,
  { signIn, signOut, setProducts, setDiscountedProducts }
)(GoogleAuth);
