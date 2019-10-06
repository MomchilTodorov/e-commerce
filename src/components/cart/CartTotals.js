import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PayPalButton from './PayPalButton';
import { connect } from 'react-redux';
import { clearCart } from '../../actions';

class CartTotals extends Component {
  render() {
    const { cartSubTotal, cartTax, cartTotal } = this.props.data;
    return (
      <React.Fragment>
        <div className="container"></div>
        <div className="row">
          <div className="col-10 mt-2 mr-lg-5 ml-sm-auto mr-sm-4 ml-md-auto mr-md-4 col-sm-8 text-capitalize text-right">
            <Link to="/">
              <button
                className="btn btn-outline-danger text-uppercase mb-3 px-5"
                type="button"
                onClick={() => {
                  this.props.clearCart();
                }}
              >
                clear cart
              </button>
            </Link>
            <h5>
              <span className="text-title">subtotal :</span>
              <strong>${cartSubTotal}</strong>
            </h5>
            <h5>
              <span className="text-title">tax :</span>
              <strong>${cartTax}</strong>
            </h5>
            <h5>
              <span className="text-title">total :</span>
              <strong>${cartTotal}</strong>
            </h5>
            <PayPalButton total={cartTotal} clearCart={this.props.clearCart} />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return { data: state.data };
}

export default connect(
  mapStateToProps,
  { clearCart }
)(CartTotals);
