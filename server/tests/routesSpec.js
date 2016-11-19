var request = require('request');
var expect = require('chai').expect;
var currUrl = require('./../../currUrl');

describe ('server routes for webhooks', () => {
  var requests = [{
    uri: `${currUrl}/api/webhooks/slack`,
    method: 'POST',
    json: {
      type: 'url_verification',
      challenge: 'testMe01',
      token: 'a1w5cdEEWMlk4t8TZ60TOX43',
    },
  },
    `${currUrl}/api/user/concoctions?username=kyle`,];

  it ('should answer with a 200 and the challenge if posting to /api/webhooks/slack and type: url_verification', (done) => {
    request(requests[0], (err, res, body) => {
      expect(res.statusCode).to.equal(200);
      expect(body.challenge).to.equal(requests[0].json.challenge);
      done();
    });
  });

  it ('should answer with a 200 if posting to /api/webhooks/slack', (done) => {
    request(requests[0], (err, res, body) => {
      expect(res.statusCode).to.equal(200);
      done();
    });
  });

  it('should 404 when asked for a nonexistent endpoint', (done) => {
    request(`${currUrl}/arglebargle`, (error, res, body) => {
      expect(res.statusCode).to.equal(404);
      done();
    });
  });

  it('should send an object containing an `oauths` array and a `concoctions` array', (done) => {
    request(requests[1], (error, response, body) => {
      body = JSON.parse(body);
      expect(body).to.be.an('object');
      expect(body.oauths).to.be.an('array');
      expect(body.concoctions).to.be.an('array');
      done();
    });
  });
});