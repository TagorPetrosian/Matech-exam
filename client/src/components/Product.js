import React from 'react';
const Product = ({
  product: { title, price, avgPrice, maxPrice, minPrice, rating, availability }
}) => {
  return (
    <React.Fragment>
      <span>{title}</span>
      <span>{price}</span>
      <span>{avgPrice}</span>
      <span>{maxPrice}</span>
      <span>{minPrice}</span>
      <span>{rating}</span>
      <span>{availability}</span>
    </React.Fragment>
  );
};

export default Product;
