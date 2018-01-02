const assert = require('assert');
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../src/app');
const Driver = mongoose.model('driver');

describe('Drivers controller', () => {
  it('POST to /api/drivers creates a driver', (done) => {
    Driver.count().then(originalCount => {
      request(app)
        .post('/api/drivers')
        .send({ email: 'test@test.com' })
        .end((err, res) => {
          Driver.count().then(newCount => {
            assert.equal(res.status, 201);
            assert.equal(newCount, originalCount + 1);
            done();
          });
        });
    });
  });

  it('PUT to /api/drivers updates a driver', (done) => {
    const driver = new Driver({ email: 'a@a.com', driving: false });
    driver.save().then(() => {
      request(app)
        .put(`/api/drivers/${driver._id}`)
        .send({ driving: true })
        .end((err, res) => {
          Driver.findOne({ email: 'a@a.com' }).then(driver => {
            assert.equal(res.status, 200);
            assert(driver.driving === true);
            done();
          });
        });
    });
  });

  it('DELETE to /api/drivers removes a driver', (done) => {
    const driver = new Driver({ email: 'a@a.com', driving: false });
    driver.save().then(() => {
      Driver.count().then(originalCount => {
        request(app)
          .delete(`/api/drivers/${driver._id}`)
          .end((err, res) => {
            Driver.count().then(newCount => {
              assert.equal(res.status, 204);
              assert.equal(newCount, originalCount - 1);
              done();
            });
          });
      });
    })
  });
});
