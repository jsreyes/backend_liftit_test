var express = require('express');
var fs = require('fs');
var path = require('path');
var http = require('http');
var https = require('https');
var app = express();
var request = require("request");


var HTTP_PORT = 3500;

app.listen(HTTP_PORT, () => {
  console.log("El servidor está inicializado en el puerto", HTTP_PORT);
});

app.get('/', function(req, res) {
  // console.log(req, ' este es req')
  request.get('https://maps.googleapis.com/maps/api/directions/json?origin=Bogota&destination=Medellin&key=AIzaSyD_7DT7arDmbXGcwIdZ68-HwGH5nwenAEE', (error, response, body) => {
    if (error) {
      return console.dir(error);
    }
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    console.dir(JSON.parse(body));
    // console.dir(JSON.parse(body.routes[0].legs[0].distance.text));
    var distance = JSON.parse(body.routes[0].legs[0]);
    console.dir(distance, ' esta es la distance');
    // console.dir(JSON.parse(body.routes[0].legs[0].duration.text));

  });
  // request.get({ url: 'https://maps.googleapis.com/maps/api/directions/json?origin=Bogota&destination=Medellin&key=AIzaSyD_7DT7arDmbXGcwIdZ68-HwGH5nwenAEE', headers: request.headers });
  // Request.get('Content-Type');
  // req.url('https://maps.googleapis.com/maps/api/directions/json?origin=Bogota&destination=Medellin&key=AIzaSyD_7DT7arDmbXGcwIdZ68-HwGH5nwenAEE');
  // processRequest(request);
  // console.log(res, ' esta es la respuesta');
  // res.header("Access-Control-Allow-Origin", "*");
  // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  // res.setHeader('Content-Type', 'application/json');
  // console.log(res, ' esta es la respuesta con json');
  // res.send('Req OK');
});

app.get('/prueba', () => {
  request('https://maps.googleapis.com/maps/api/directions/json?origin=Bogota&destination=Medellin&key=AIzaSyD_7DT7arDmbXGcwIdZ68-HwGH5nwenAEE', function(error, response, body) {
    console.error('error:', error); // Print the error if one occurred
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    console.log('body:', body); // Print the HTML for the Google homepage.
  });
});

function processRequest(req) {
  console.log("request processed");
}