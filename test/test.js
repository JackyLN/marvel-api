let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../src/index');
const {
  util
} = require('chai');
let should = chai.should();

chai.use(chaiHttp);
chai.use(require('chai-string'));

const Memcached = require('memcached');
const config = require('../src/config');

let memcached = new Memcached(config.server.CACHING_SERVER);

describe('Characters', () => {
  describe('/GET characters', function () {
    describe('/GET characters', function () {
      this.timeout(300000);
      it('it should GET all Marvel characters ID', (done) => {
        chai.request(server)
          .get('/characters')
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('array');
            res.body.should.have.lengthOf.above(0)

            done();
          });
      });
    });

    describe('Test caching', function () {
      this.timeout(300000);

      before(function (done) {
        let key = "__marvel_character__/characters";
        let keyCount = "__marvel_character_count__";
        memcached.del(key, (err) => {});
        memcached.del(keyCount, (err) => {});

        chai.request(server)
          .get('/characters')
          .end((err, res) => {
            done();
          });
      });

      it('Read from cache should less than 5 seconds', (done) => {
        let start = Date.now();
        chai.request(server)
          .get('/characters')
          .end((err, res) => {
            let duration = Date.now() - start;
            duration.should.be.below(5000);
            done();
          });
      });

      it('Read from cache should less than 4 seconds', (done) => {
        let start = Date.now();
        chai.request(server)
          .get('/characters')
          .end((err, res) => {
            let duration = Date.now() - start;
            duration.should.be.below(4000);
            done();
          });
      });

      it('Read from cache should less than 3 seconds', (done) => {
        let start = Date.now();
        chai.request(server)
          .get('/characters')
          .end((err, res) => {
            let duration = Date.now() - start;
            duration.should.be.below(3000);
            done();
          });
      });
    });

    describe('Test cache update when new character appears', function () {
      this.timeout(300000);
      let key = "__marvel_character__/characters";
      let keyCount = "__marvel_character_count__";

      before(function (done) {

        memcached.set(key, '[]', (60 * 60), function (err) {});
        memcached.set(keyCount, '0', (60 * 60), function (err) {});

        chai.request(server)
          .get('/characters')
          .end((err, res) => {
            done();
          });
      });

      it('It should update the total character', (done) => {
        memcached.get(keyCount, (err, data) => {
          data.should.be.a('number');
          data.should.be.above(0);
          done();
        });
      });

      it('It should update the array of character ID', (done) => {
        memcached.get(key, (err, data) => {
          let arr = JSON.parse(data);
          arr.should.be.a('array');
          arr.should.have.lengthOf.above(0);
          done();
        });
      });

    });
  });
});

describe('Characters/{id}', () => {
  describe('/GET characters/1010794', function () {
    let error, response;
    before(function (done) {
      chai.request(server)
        .get('/characters/1010794')
        .end((err, res) => {
          error = err, response = res;
          done();
        });
    });

    it('it should return 200', () => {
      response.should.have.status(200);
    });

    it('it should return character with id / name / description', () => {
      response.body.should.be.a('object');
      response.body.should.have.all.keys(['id', 'name', 'description']);
    })
  });

  describe('/GET characters/-1', function () {

    let error, response;
    before(function (done) {
      chai.request(server)
        .get('/characters/-1')
        .end((err, res) => {
          error = err, response = res;
          done();
        });
    });

    it('it should return 404', () => {
      response.should.have.status(404);
    });

    it(`it should return message "We couldn't find that character"`, () => {
      response.body.should.be.a('string');
      response.body.should.be.equal("We couldn't find that character");
    })
  });

  describe('/GET characters/aaaaaa', function () {

    let error, response;
    before(function (done) {
      chai.request(server)
        .get('/characters/aaaaaa')
        .end((err, res) => {
          error = err, response = res;
          done();
        });
    });

    it('it should return 404', () => {
      response.should.have.status(404);
    });

    it(`it should return message "We couldn't find that character"`, () => {
      response.body.should.be.a('string');
      response.body.should.be.equal("We couldn't find that character");
    })
  });
});