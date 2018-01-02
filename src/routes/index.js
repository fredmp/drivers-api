const drivers = require('../controllers/drivers');

module.exports = (app) => {

  app.get('/api', drivers.greeting);

  app.post('/api/drivers', drivers.create);
};
