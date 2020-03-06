import React from 'react';
import Header from './Header';

export default ({ children }) => {
  return (
    <div className='container'>
      <h1>Amazon scraper</h1>
      <Header />
      {children}
    </div>
  );
};
