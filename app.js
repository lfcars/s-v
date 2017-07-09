var express = require('express');
//var path = require('path');
var path = require('path');
var mongoose = require('mongoose');
var Venda = require('./venda.model.js');
var bodyParser = require('body-parser');
var favicon = require('serve-favicon');

var exphbs = require('express-handlebars')

//mongoose
//var myDB = 'mongodb://localhost/example';

//mlab
var myDB = 'mongodb://sak:gestSAK1234@ds153422.mlab.com:53422/sak-vouchers';

mongoose.connect(myDB);


var app = express();
app.use(express.static('public'));
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

//app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars',exphbs({defaultLayout: 'main'}));
app.set('view engine','handlebars');

app.get('/',function(req,res){

  //pede vendas à base de dados
  Venda.find({/*product:"Morph"*/}).exec(function(err,vendas){
    if (err) {
      res.send('error occured')
    }
    console.log(vendas);
    res.render('home',{vendas: vendas});
  });

});

app.get('/createVoucher',function(req,res){

  //pede vendas à base de dados
  Venda.find({/*product:"Morph"*/}).exec(function(err,vendas){
    if (err) {
      res.send('error occured')
    }
    console.log(vendas);
    res.render('createVoucher',{vendas: vendas});
  });

});


/*
Venda.create({}, function(err, doc) {
    // At this point the jobs collection is created.
});
*/

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));


app.post('/',function(req,res){
      var query = {"voucherID": req.body.voucherID};

//verifica se voucher já foi usado
      Venda.findOne(query, function(err, voucher) {
        if (err) {
          console.log('got an error');
        }
        //voucher existe?
        if (!voucher){
          console.log('Esse voucher não existe');
        }
        else {
          //voucher registado?
          if (voucher.registered===true){
            console.log('Esse voucher já foi registado');
          }
          else{
            var update = {"day": req.body.day,
                          "time": req.body.time,
                          "docNumber": req.body.docNumber,
                          "registered": true};
            var options = {new: false};
            Venda.findOneAndUpdate(query, update, options, function(err, voucher) {
              if (err) {
                console.log('got an error');
              }
              // at this point person is null.
            });
            Venda.find({/*product:"Morph"*/}).exec(function(err,vendas){
              if (err) {
                res.send('error occured')
              }
    //          console.log(vendas);
              res.render('home',{vendas: vendas});
            });
          }
        }
        // at this point person is null.
      });
})

app.post('/createVoucher',function(req,res){

  var novaVenda = new Venda();

  novaVenda.store = req.body.storeCV;
  novaVenda.voucherID = req.body.voucherIDCV;
  novaVenda.product = req.body.productCV;
  novaVenda.registered = false;
  novaVenda.save(function(err,venda){
    if (err){
      res.send('deu asneira!');
    }
    else {
      Venda.find({/*product:"Morph"*/}).exec(function(err,vendas){
        if (err) {
          res.send('error occured')
        }
        console.log(vendas);
        res.render('createVoucher',{vendas: vendas});
      });
    }
  })
})

app.get('/vendas', function(req,res){
  Venda.find({/*product:"Morph"*/}).exec(function(err,vendas){
    if (err) {
      res.send('error occured')
    }
    else {
      res.json(vendas);
    }
  });
})

// app.get('/favicon.ico', function(req, res) {
//     res.send(204);
// });


app.listen(8080);

console.log('listening on 8080')
