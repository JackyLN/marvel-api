let chai = require('chai');
let chaiHttp = require('chai-http');
// let server = require('../server');
let should = chai.should();
let request = require('supertest');
let assert = require('assert');

chai.use(chaiHttp);

describe('1) loading express', function () {
  var server;
  beforeEach(function () {
    server = require('../src/index');
  });
  afterEach(function () {
    server.close();
  });
  it('responds to /', function testSlash(done) {
  request(server)
    .get('/')
    .expect(200, done);
  });
  it('404 everything else', function testPath(done) {
    request(server)
      .get('/foo/bar')
      .expect(404, done);
  });
});