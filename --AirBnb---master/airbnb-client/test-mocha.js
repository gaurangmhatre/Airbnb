var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('./app');
//var should = chai.should();
chai.use(chaiHttp);
var assert = chai.assert;
var should = require('chai').should();


//Testing SignIn


var credentials = {"inputUsername":"kunal312@gmail.com","inputPassword":"12345678"}
describe('afterSignIn', function() {
  
  it('should sign in', function(done) {
  	chai.request(server)
  	 .post('/afterSignIn')
  	 .send(credentials)
  	 .end(function(err, res){
  	  res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a('object');
 

      done();
    });

  });



});


var parameters = {"firstname":"Kunal","lastname":"Ahuja","userid":"kunal312","contact":"9158436377",
		"birthdate":"09/30/1990","location":"San Jose"};

describe('profilechanges', function() {
  
  it('should update  profile', function(done) {
  	chai.request(server)
  	 .post('/profilechanges')
  	 .send(parameters)
  	 .end(function(err, res){
  	 	
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a('object')
 

      done();
    });

  });



});


describe('viewCart', function() {
  
  it('should be able to fetch item from cart', function(done) {
  	chai.request(server)
  	 .post('/viewCart')
  	 .end(function(err, res){
  	 	
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a('object')
 

      done();
    });

  });



});


var credentials = {"itemid":"581e80b2037a9787af06b8a3","bidprice":"290"}
describe('bidupdate', function() {
  
  it('should update  bid', function(done) {
  	chai.request(server)
  	 .post('/bidupdate')
  	 .send(credentials)
  	 .end(function(err, res){
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a('object')
 

      done();
    });

  });



});



var credentials = {"card":"1122334455667788","expiry":"10/2018","cvv":"290"}
describe('paymentValidate', function() {
  
  it('should make payment', function(done) {
  	chai.request(server)
  	 .post('/paymentValidate')
  	 .send(credentials)
  	 .end(function(err, res){
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a('object')
 

      done();
    });

  });



});

