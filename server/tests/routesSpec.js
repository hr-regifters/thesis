const request = ('request');
const expect = require('chai').expect;
const currUrl = require('./../../currUrl');

describe ('server routes for webhooks', () => {
  var requests = [{
    uri: `${currUrl}/api/webhooks/slack`,
    method: 'POST',
    json: {
      type: 'url_verification',
      challenge: 'testMe01',
      token: 'a1w5cdEEWMlk4t8TZ60TOX43',
    },
  }];

  it ('should answer with a 200 and the challenge if posting to /api/webhooks/slack and type: url_verification', (done) => {
    request(requests[1], (err, res, body) => {
      expect(res.statusCode).to.equal(200);
      expect(JSON.parse(body).challenge).to.equal(requests[1].json.challenge);
      done();
    });
  });

  it ('should answer with a 200 if posting to /api/webhooks/slack', (done) => {
    request(requests[1], (err, res, body) => {
      expect(res.statusCode).to.equal(200);
      done();
    });
  });

  it('Should 404 when asked for a nonexistent endpoint', (done) => {
    request('http://127.0.0.1:3000/arglebargle', (error, res, body) => {
      expect(res.statusCode).to.equal(404);
      done();
    });
  });
});