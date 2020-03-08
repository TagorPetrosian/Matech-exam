import React, { Component } from 'react';
import Product from './Product';
import { connect } from 'react-redux';
import { fetchProducts } from '../actions';
import requireAuth from './requireAuth';
import AddProductBar from './AddProductBar';

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
      <React.Fragment>
        <AddProductBar />
        <div className='table'>
          <span>Title</span>
          <span>Price</span>
          <span>Average Price</span>
          <span>Max Price</span>
          <span>Min Price</span>
          <span>Rating</span>
          <span>Availability</span>
          {this.renderProducts()}
        </div>
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return { products: state.products };
}

export default connect(mapStateToProps, { fetchProducts })(Main);
// export default requireAuth(Main);
