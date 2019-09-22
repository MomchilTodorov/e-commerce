import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { ButtonContainer } from './Button';
import { Link } from 'react-router-dom';
import { closeModal } from '../actions';

class Modal extends Component {
  render() {
    const { modalOpen } = this.props.data;
    const { img, title, price } = this.props.data.modalProduct;

    if (!modalOpen) {
      return null;
    } else {
      return (
        <ModalContainer>
          <div className="container">
            <div className="row">
              <div
                id="modal"
                className="col-8 mx-auto col-md-6 col-lg4 text-center text-capitalize p-5"
              >
                <h5>item added to the cart</h5>
                <img src={img} className="img-fluid" alt="product" />
                <h5>{title}</h5>
                <h5 className="text-muted">price : ${price}</h5>
                <Link to="/">
                  <ButtonContainer onClick={() => this.props.closeModal()}>
                    continue shopping
                  </ButtonContainer>
                </Link>
                <Link to="/cart">
                  <ButtonContainer cart onClick={() => this.props.closeModal()}>
                    go to cart
                  </ButtonContainer>
                </Link>
              </div>
            </div>
          </div>
        </ModalContainer>
      );
    }
  }
}

function mapStateToProps(state) {
  return { data: state.data };
}

export default connect(
  mapStateToProps,
  { closeModal }
)(Modal);

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  #modal {
    background: var(--mainWhite);
  }
`;
