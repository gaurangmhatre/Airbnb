var server=require('../app');

var chai = require('chai');
var chaihttp = require('chai-http');

chai.use(chaihttp);

var should = require('chai').should();


var assert = require('assert');
/*

 var signupCredentials={"email":"a@b.com","password":"213"}
 describe('signup', function() {
 it('should signup', function (done) {
 chai.request(server)
 .post('/signup')
 .send(signupCredentials)
 .end(function (err, res) {
 //console.log(res.body);
 res.should.have.status(200);
 res.should.be.json;
 //res.body.should.be.a('object');
 done();
 });
 });
 });

 var signInCredentials={"email":"a@b.com","password":"213"}
 describe('login', function() {
 it('should login', function (done) {
 chai.request(server)
 .post('/login')
 .send(signInCredentials)
 .end(function (err, res) {
 //console.log(res.body);
 res.should.have.status(200);
 res.should.be.json;
 //res.body.should.be.a('object');
 done();
 });
 });
 });
 */

describe('getAllCities', function() {
    it('should get all cities', function (done) {
        chai.request(server)
            .get('/allCities')

            .end(function (err, res) {
                console.log(res.body);
                res.should.have.status(200);
                res.should.be.json;
                done();
            });
    });
});

describe('getAllHostDetails', function() {
    it('Admin: should get all user', function (done) {
        chai.request(server)
            .post('/adminGetAllHostDetails')
            //            .send(signInCredentials)
            .end(function (err, res) {
                console.log(res.body);
                res.should.have.status(200);
                res.should.be.json;
                done();
            });
    });
});

describe('getAllHostDetailsWithRedis', function() {
    it('Admin: should get all user', function (done) {
        chai.request(server)
            .post('/adminGetAllHostDetailsWithRedis')
            //            .send(signInCredentials)
            .end(function (err, res) {
                console.log(res.body);
                res.should.have.status(200);
                res.should.be.json;
                done();
            });
    });
});

describe('adminGetAllUserDetails', function() {
    it('Admin: should get all user', function (done) {
        chai.request(server)
            .post('/adminGetAllUserDetails')
            //            .send(signInCredentials)
            .end(function (err, res) {
                console.log(res.body);
                res.should.have.status(200);
                res.should.be.json;
                done();
            });
    });
});

describe('getAllUserDetailsWithRedis', function() {
    it('Admin: should get all user', function (done) {
        chai.request(server)
            .post('/adminGetAllUserDetailsWithRedis')
            //            .send(signInCredentials)
            .end(function (err, res) {
                console.log(res.body);
                res.should.have.status(200);
                res.should.be.json;
                done();
            });
    });
});

describe('getAllBillDetails', function() {
    it('Admin: should get all bill', function (done) {
        chai.request(server)
            .get('/adminGetAllBillDetails')
            .end(function (err, res) {
                console.log(res.body);
                res.should.have.status(200);
                res.should.be.json;
                done();
            });
    });
});

describe('getAllBillDetailsWithRedis', function() {
    it('Admin: should get all bill', function (done) {
        chai.request(server)
            .post('/adminGetAllBillDetailsWithRedis')
            .end(function (err, res) {
                console.log(res.body);
                res.should.have.status(200);
                res.should.be.json;
                done();
            });
    });
});

describe('getAllNewListings', function() {
    it('Admin: Get All new listings ', function (done) {
        chai.request(server)
            .post('/adminGetAllNewListing')

            .end(function (err, res) {
                console.log(res.body);
                res.should.have.status(200);
                res.should.be.json;
                done();
            });
    });
});

describe('getAllApprovedListings', function() {
    it('Admin: should get all approved listings', function (done) {
        chai.request(server)
            .post('/adminGetAllApprovedListings')
            .end(function (err, res) {
                console.log(res.body);
                res.should.have.status(200);
                res.should.be.json;
                done();
            });
    });
});

describe('getAllRejectedListings', function() {
    it('Admin: should get all rejected listings', function (done) {
        chai.request(server)
            .post('/adminGetAllRejectedListings')
            .end(function (err, res) {
                console.log(res.body);
                res.should.have.status(200);
                res.should.be.json;
                done();
            });
    });
});
