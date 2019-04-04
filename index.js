var express = require('express');
var app = express();
var request = require("request");
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Modelo de respuesta
let responseGoogle = {
  distance: '',
  duration: '',
  start_location: '',
  end_location: ''
}

var HTTP_PORT = 3500;

app.listen(HTTP_PORT, () => {
  console.log("El servidor está inicializado en el puerto", HTTP_PORT);
});

app.get('/route', function(req, res) {
  request.get('https://maps.googleapis.com/maps/api/directions/json?origin=' + req.query.origin + '&destination=' + req.query.destination + '&key=AIzaSyD_7DT7arDmbXGcwIdZ68-HwGH5nwenAEE', (error, response, body) => {
    var bodyJ = JSON.parse(body);
    if (error) {
      res.status(500).send('Error en la petición');
    } else {
      if (bodyJ.status !== 'OK') {
        res.status(404).send('Ha ingresado una direccion inexistente');
      } else {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        responseGoogle.distance = (bodyJ.routes[0].legs[0].distance.text);
        responseGoogle.duration = (bodyJ.routes[0].legs[0].duration.text);
        responseGoogle.start_location = (bodyJ.routes[0].legs[0].start_location);
        responseGoogle.end_location = (bodyJ.routes[0].legs[0].end_location);
      }
    }
  });
});