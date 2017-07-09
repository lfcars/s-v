var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var VendaSchema = new Schema({
  store: String,
  voucherID: String,
  product: String,
  day: String,
  time: String,
  docNumber: String,
  price: Number,
  registered: Boolean
});

module.exports = mongoose.model('Venda',VendaSchema)
