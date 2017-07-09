var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var exphbs = require('express-handlebars')
var Venda = require('./venda.model.js');
var path = require('path');
var favicon = require('serve-favicon');

//mongoose
//var myDB = 'mongodb://localhost/example';

//mlab
//var myDB = 'mongodb://sak:gestSAK1234@ds153422.mlab.com:53422/sak-vouchers';

//mongoose.connect(myDB);

var app = express();

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

//app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars',exphbs({defaultLayout: 'main'}));
app.set('view engine','handlebars');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));



app.get('/', function(req,res){
    if (err) {
      res.send('error occured')
    }
    else {
      res.send('ok');
    }
  });

//app.listen(8080);

var server_port = process.env.OPENSHIFT_NODEJS_PORT || 8080
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1'

  app.listen(server_port, server_ip_address, function(){
    console.log("Listening on " + server_ip_address + ", server_port " + server_port)
  });

  app.use(express.static('public'));
