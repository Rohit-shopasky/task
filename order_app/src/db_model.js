const mongoose = require('mongoose');
mongoose.connect('mongodb://mongo:27017/orders');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

const AutoIncrement = require('mongoose-sequence')(mongoose);


const order = new mongoose.Schema({
    customer_id:Number,
    order_state:{type:String,default:'created'},
    payment_status:{ type: Boolean, default: false },
    created_at:{ type: Date, default: new Date() },  
    total_payable_amount:{type:Number,default:100},
    order_checksum:String,
    transaction_id:{type:String,default:null},
})
order.plugin(AutoIncrement, {inc_field:'order_id'});  // plugin added for auto increment order id




const Schemas = {
    orderModel : mongoose.model('orders',order),
}

module.exports = Schemas;
