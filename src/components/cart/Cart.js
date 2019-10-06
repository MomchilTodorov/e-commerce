import React, { Component } from 'react';
import Title from '../Title';
import CartColumns from './CartColumns';
import EmptyCart from './EmptyCart';
import CartList from './CartList';
import CartTotals from './CartTotals';
import { connect } from 'react-redux';

class Cart extends Component {
  render() {
    const { cart } = this.props.data;
    if (cart.length > 0) {
      return (
        <React.Fragment>
          <Title name="your" title="cart" />
          <CartColumns />
          <CartList />
          <CartTotals />
        </React.Fragment>
      );
    } else {
      return <EmptyCart />;
    }
  }
}

function mapStateToProps(state) {
  return { data: state.data };
}

export default connect(mapStateToProps)(Cart);
