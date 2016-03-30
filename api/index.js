var restify = require('restify');
var http    = require('http');
var request = require('request');
var endpoints = require('./endpoints.config');

var server = restify.createServer({
  name: 'KYC-Server',
  version: '1.0.0'
});

server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());

server.get('/getLatestDocs', function (req, resp, next) {
  request(endpoints.docsUrlOptions, cbWithRespHandler(resp));
  return next();
});

server.get('/getLatestVerifs', function (req, resp, next) {
  request(endpoints.verificationsOptions, cbWithRespHandler(resp));
  return next();
});

server.get('/document/:documentId', function (req, resp, next) {
  request(endpoints.verifOptionsWithDocument (req.params), cbWithRespHandler(resp));
  return next();
});

// Backend - Options

function cbWithRespHandler(resp){
  return (error, response, body) => {
    if (!error && response.statusCode == 200) {
      resp.header('Content-Type', 'application/json');
      // TODO: Remove CORS allow all.
      resp.header('Access-Control-Allow-Origin', '*');
	  resp.send(200, JSON.parse(body));
    } else {
      console.log("Error: " + error + resp.statusCode);
    }
  }
}

server.listen(8081, function () {
  console.log('%s listening at %s', server.name, server.url);
});
