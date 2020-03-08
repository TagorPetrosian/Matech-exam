const Product = require('../models/product');

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

module.exports = async function updateProducts() {
  console.log('running update');
  const products = await Product.find({});
  // console.log(products);
  await asyncForEach(products, async product => {
    const pricesLen = product.prices.length;
    const lastPrice = product.prices[pricesLen - 1];

    //random price could be swapped with puppeteer scrape function
    //since prices usually stay the same and I wanted to show some fluctuation given the short period of data gathering time
    const randomPrice = Number(
      getRandomArbitrary(lastPrice.price - 5, lastPrice.price + 5).toFixed(2)
    );
    await Product.updateOne(
      { asin: product.asin },
      {
        $push: {
          prices: [{ price: randomPrice }]
        }
      },
      function(err, result) {
        console.log('updating product err', err);
        // console.log('result', result);
      }
    );
  });
};
