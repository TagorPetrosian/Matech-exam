import React, { Component } from 'react';
import Product from './Product';
import { connect } from 'react-redux';
import { fetchProducts } from '../actions';
import requireAuth from './requireAuth';

class Main extends Component {
  renderProducts() {
    return this.props.products.map((product, index) => (
      <Product key={index} product={product} />
    ));
  }

  componentDidMount() {
    this.props.fetchProducts();
  }

  render() {
    return (
      <div className='table'>
        <span>Item</span>
        <span>Description</span>
        <span>Price</span>
        <span>Average Price</span>
        <span>Max Price</span>
        <span>Min Price</span>
        <span>Rating</span>
        <span>Availability</span>
        {this.renderProducts()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { products: state.products };
}

export default connect(mapStateToProps, { fetchProducts })(Main);
// export default requireAuth(Main);
