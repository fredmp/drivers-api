const Driver = require('../models/driver');

module.exports = {

  index(req, res, next) {
    const { lng, lat } = req.query;
    if (!lng || !lat) {
      return res.status(400).send({ message: 'Required fields: lng and lat' });
    }
    Driver.aggregate().near({
      near: [parseFloat(lng), parseFloat(lat)],
      distanceField: "dist.calculated",
      includeLocs: "dist.location",
      maxDistance: 0.5,
      uniqueDocs: true,
      num: 5,
      spherical: true
    }).then(drivers => res.send(drivers)).catch(next);
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
