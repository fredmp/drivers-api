const Driver = require('../models/driver');

module.exports = {

  greeting(req, res) {
    res.send({ hi: 'there' });
  },

  create(req, res, next) {
    Driver.create(req.body)
      .then(driver => res.status(201).send(driver))
      .catch(next);
  },

  update(req, res, next) {
    Driver.findByIdAndUpdate(req.params.id, req.body)
      .then(() => Driver.findById(req.params.id))
      .then(driver => res.status(200).send(driver))
      .catch(next);
  },

  delete(req, res, next) {
    Driver.findByIdAndRemove(req.params.id)
      .then(() => res.status(204).end())
      .catch(next);
  }
}
