const mongoose = require('mongoose');
mongoose.connect('mongodb://mongo:27017/orders');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

const AutoIncrement = require('mongoose-sequence')(mongoose);


const payment = new mongoose.Schema({
    customer_id:Number,
    total_payable_amount:{type:Number,default:0},
    transaction_id :{type:Number,default:Math.floor(Math.random()*90000) + 10000},
    created_at:{ type: Date, default: new Date() },  
    payment_status:{type:String},
})
payment.plugin(AutoIncrement, {inc_field:'payment_id'});  // plugin added for auto increment order id




const Schemas = {
    paymentModel : mongoose.model('payments',payment),
}

module.exports = Schemas;
