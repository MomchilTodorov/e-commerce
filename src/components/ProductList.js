import React, { Component } from 'react';
import Product from './Product';
import Title from './Title';
import { connect } from 'react-redux';
import { updateProducts, setProducts } from '../actions';

class ProductList extends Component {
  componentDidMount() {
    if (this.props.products.length <= 0 && this.props.isSignedIn === null) {
      this.props.setProducts();
    }
  }

  render() {
    let productList = this.props.products.map(product => {
      return <Product key={product.id} product={product} />;
    });

    return (
      <React.Fragment>
        <div className="py-5">
          <div className="container">
            <Title name="our" title="products" />

            <div className="row">{productList}</div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  const { products } = state.data;
  const { isSignedIn } = state.auth;
  return { products: products, isSignedIn: isSignedIn };
}

export default connect(
  mapStateToProps,
  { updateProducts, setProducts }
)(ProductList);
