const Authentication = require('./controllers/authentication');
const passportService = require('./services/passport');
const passport = require('passport');
const mongoose = require('mongoose');
const Product = require('./models/product');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });
const puppeteer = require('puppeteer');

module.exports = function(app) {
  app.get('/', requireAuth, function(req, res) {
    res.send({ hi: 'there' });
  });

  //requireAuth enable
  app.get('/products', async function(req, res) {
    await Product.find({}, function(err, products) {
      const finalProducts = products.map(product => {
        const pricesLen = product.prices.length;
        const DAYS_IN_WEEK = 7;
        //get last 7 prices
        const prices = product.prices.slice(
          Math.max(pricesLen - DAYS_IN_WEEK, 0)
        );
        return {
          title: product.title,
          price: product.prices[product.prices.length - 1].price,
          maxPrice: Math.max(...prices.map(item => item.price)),
          minPrice: Math.min(...prices.map(item => item.price)),
          avgPrice: Number(
            (
              prices.reduce((acc, item) => acc + item.price, 0) / prices.length
            ).toFixed(2)
          ),
          rating: product.rating,
          availability: product.availability
        };
      });

      res.send(finalProducts);
    });
  });

  app.post('/products', async (req, res) => {
    const { asin } = req.body;
    (async () => {
      let priceFinal = 999;
      let availabilityFinal = 'Not available';
      let ratingFinal = '0';
      let titleFinal = 'No Title';
      try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        await page.goto('https://www.amazon.com');
        await page.goto(`https://www.amazon.com/dp/${asin}`);

        //Get Price
        const [price] = await page.$x('//*[@id="priceblock_ourprice"]');
        const priceTxt = await price.getProperty('textContent');
        const priceJson = await priceTxt.jsonValue();
        priceFinal = Number(priceJson.match(/\W+?(\d*\.?\d*)/)[1]);

        //Get Title
        const [title] = await page.$x('//*[@id="productTitle"]');
        const titleTxt = await title.getProperty('textContent');
        const titleJson = await titleTxt.jsonValue();
        titleFinal = titleJson.replace('\\n', '').trim();

        //Get Availability
        const [availability] = await page.$x('//*[@id="availability"]');
        const availabilityTxt = await availability.getProperty('textContent');
        const availabilityJson = await availabilityTxt.jsonValue();
        availabilityFinal = availabilityJson.replace('\\n', '').trim();
        //Get Rating
        const [rating] = await page.$x(
          '//*[@id="acrPopover"]/span[1]/a/i[1]/span'
        );
        const ratingTxt = await rating.getProperty('textContent');
        const ratingJson = await ratingTxt.jsonValue();
        ratingFinal = Number(ratingJson.match(/\d*\.?\d*/)[0]);

        await browser.close();
      } catch (err) {
        console.log('contentretrieval err', err);
      }

      try {
        Product.findOne({ asin: asin }, function(err, existingProduct) {
          if (err) {
            return next(err);
          }

          if (existingProduct) {
            console.log(existingProduct);
            return res.status(422).send({ error: 'Product already exists' });
          }

          const product = new Product({
            asin: asin,
            title: titleFinal,
            prices: [{ price: priceFinal }],
            availability: availabilityFinal,
            rating: ratingFinal
          });

          product.save(function(err) {
            if (err) {
              return next(err);
            }

            res.send({
              title: titleFinal,
              price: priceFinal,
              maxPrice: priceFinal,
              minPrice: priceFinal,
              avgPrice: priceFinal,
              rating: ratingFinal,
              availability: availabilityFinal
            });
          });
        });
      } catch (err) {
        console.log('creating product error', err);
        res.status(422).send(err);
      }
    })();
  });

  app.post('/signin', requireSignin, Authentication.signin);
  app.post('/signup', Authentication.signup);
};
