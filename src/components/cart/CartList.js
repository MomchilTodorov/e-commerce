import React, { Component } from 'react';
import { connect } from 'react-redux';
import CartItem from './CartItem';

class CartList extends Component {
  render() {
    const { cart } = this.props.data;

    return (
      <div className="container-fluid">
        {cart.map(item => {
          return <CartItem key={item.id} item={item} />;
        })}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { data: state.data };
}

export default connect(mapStateToProps)(CartList);
