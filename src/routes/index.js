const drivers = require('../controllers/drivers');

module.exports = (app) => {

  app.get('/api', drivers.greeting);

  app.post('/api/drivers', drivers.create);

  app.put('/api/drivers/:id', drivers.update);

  app.delete('/api/drivers/:id', drivers.delete);
};
