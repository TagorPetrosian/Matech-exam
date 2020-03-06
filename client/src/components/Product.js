import React from 'react';
const Product = ({
  product: {
    item,
    description,
    price,
    avgPrice,
    maxPrice,
    minPrice,
    rating,
    availability
  }
}) => {
  return (
    <React.Fragment>
      <span>{item}</span>
      <span>{description}</span>
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
