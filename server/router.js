const Authentication = require('./controllers/authentication');
const passportService = require('./services/passport');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

module.exports = function(app) {
  app.get('/', requireAuth, function(req, res) {
    res.send({ hi: 'there' });
  });

  //requireAuth enable
  app.get('/main', function(req, res) {
    res.send([
      {
        item: 'something',
        description: 'some description',
        price: 45,
        avgPrice: 54,
        maxPrice: 64,
        minPrice: 43,
        rating: 3.5,
        availability: 'in stock'
      },
      {
        item: 'something',
        description: 'some description',
        price: 45,
        avgPrice: 54,
        maxPrice: 64,
        minPrice: 43,
        rating: 3.5,
        availability: 'in stock'
      },
      {
        item: 'something',
        description: 'some description',
        price: 45,
        avgPrice: 54,
        maxPrice: 64,
        minPrice: 43,
        rating: 3.5,
        availability: 'in stock'
      },
      {
        item: 'something',
        description: 'some description',
        price: 45,
        avgPrice: 54,
        maxPrice: 64,
        minPrice: 43,
        rating: 3.5,
        availability: 'in stock'
      },
      {
        item: 'something',
        description: 'some description',
        price: 45,
        avgPrice: 54,
        maxPrice: 64,
        minPrice: 43,
        rating: 3.5,
        availability: 'in stock'
      },
      {
        item: 'something',
        description:
          'some description some descriptionsome descriptionsome descriptionsome descriptionsome descriptionsome description some description some descriptionsome descriptionsome descriptionsome descriptionsome descriptionsome descriptionsome description some descriptionsome descriptionsome descriptionsome descriptionsome descriptionsome descriptionsome description some descriptionsome descriptionsome descriptionsome descriptionsome descriptionsome descriptionsome description some descriptionsome descriptionsome descriptionsome descriptionsome descriptionsome description',
        price: 45,
        avgPrice: 54,
        maxPrice: 64,
        minPrice: 43,
        rating: 3.5,
        availability: 'in stock'
      }
    ]);
  });

  app.post('/signin', requireSignin, Authentication.signin);
  app.post('/signup', Authentication.signup);
};
