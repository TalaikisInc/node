/* eslint semi: "error"*/
const { join } = require('path')
const NODE_ENV = process.env.NODE_ENV === 'production' ? 'production' : 'development'
require('dotenv').config({ path: join(__dirname, `../.env.${NODE_ENV}`) })
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const should = chai.should();
const expect = chai.expect();
chai.use(chaiAsPromised);
const faker = require('faker');
const apiBenchmark = require('api-benchmark');
const url = `http://localhost:${process.env.API_PORT}/`;
const request = require('supertest')(url);
const inject = require('light-my-request')

describe('general', () => {
  it('works', (done) => {
    request.get('')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        res.should.have.property('body');
        res.body.should.have.property('hello');
        res.body.hello.should.be.equal('world');
        done();
      });
  });

  it('benchmarks', (done) => {
    const service = {
      server: url
    };

    const routes = {
      route: { name: 'Index', route: '/', method: 'get', data: { } },
    };

    apiBenchmark.measure(service, routes, (err, res) => {
      console.log(`Mean for ${res.server.route.name}: ${res.server.route.stats.mean}`);
    });
    done();
  });
});
