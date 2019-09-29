import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { ButtonContainer } from './Button';
import GoogleAuth from './googleauth/GoogleAuth';

class Navbar extends Component {
  render() {
    return (
      <NavWrapper className="navbar">
        <ul className="ul-nav">
          <li className="li-nav">
            <Link to="/">
              <i className="fas fa-laptop-code fa-2x" />
            </Link>
          </li>
          <li className="li-nav">
            <Link to="/" className="nav-link">
              <p id="products">Products</p>
            </Link>
          </li>
        </ul>
        <ul className="ul-nav cart-ul">
          <li className="li-nav">
            <Link to="/cart">
              <ButtonContainer className="cart">
                <span>
                  <i className="fas fa-cart-plus" />
                </span>
                My cart
              </ButtonContainer>
            </Link>
          </li>
        </ul>
        <div className="b-wrap">
          <GoogleAuth className="googleButton" />
        </div>
      </NavWrapper>
    );
  }
}

const NavWrapper = styled.nav`
  background: var(--mainBlue);
  .nav-link {
    color: var(--mainWhite) !important;
    font-size: 1.3rem;
  }
`;

export default Navbar;
