const assert = require('assert');
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../src/app');
const Driver = mongoose.model('driver');

describe('Drivers controller', () => {
  it('Post to /api/drivers creates a driver', (done) => {
    Driver.count().then(originalCount => {
      request(app)
        .post('/api/drivers')
        .send({ email: 'test@test.com' })
        .end(response => {
          Driver.count().then(newCount => {
            assert.equal(newCount, originalCount + 1);
            done();
          })
        });
    });
  });
});
