import React, { Component } from 'react';
import { connect } from 'react-redux';
import { removeItem, increment, decrement } from '../../actions';

class CartItem extends Component {
  render() {
    const { id, title, img, price, total, count } = this.props.item;
    return (
      <div className="row my-2 text-capitalize text-center">
        <div className="col-10 mx-auto col-lg-2">
          <img
            src={img}
            style={{ width: '5rem', height: '5rem' }}
            className="img-fluid"
            alt="product"
          />
        </div>
        <div className="col-10 mx-auto col-lg-2">
          <span className="d-lg-none">product : </span>
          {title}
        </div>
        <div className="col-10 mx-auto col-lg-2">
          <span className="d-lg-none">price : </span>${price}
        </div>
        <div className="col-10 mx-auto col-lg-2 my-2 my-lg-0">
          <div className="d-flex justify-content-center">
            <div>
              <span
                className="btn btn-black mx-1"
                onClick={() => this.props.decrement(id)}
              >
                -
              </span>
              <span className="btn btn-black mx-1">{count}</span>
              <span
                className="btn btn-black mx-1"
                onClick={() => {
                  this.props.increment(id);
                }}
              >
                +
              </span>
            </div>
          </div>
        </div>
        <div className="col-10 mx-auto col-lg-2">
          <div
            className="cart-icon"
            onClick={() => {
              this.props.removeItem(id);
            }}
          >
            <i className="fas fa-trash" />
          </div>
        </div>
        <div className="col-10 mx-auto col-lg-2">
          <strong>item total : ${total}</strong>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { data: state.data };
}

export default connect(
  mapStateToProps,
  { removeItem, increment, decrement }
)(CartItem);
