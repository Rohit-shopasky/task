"use strict";

const create_order = require("./create_order.js");
const cancel_order = require("./cancel_order.js");
const show_order   = require("./show_order.js");

// all end points of orderer app are listed here

module.exports = function(app) {

app.post("/create_order",create_order.create);
app.put("/cancel_order",cancel_order.cancel);
app.get("/check_order_status",show_order.show_order_state); 
app.get("/show_all_orders",show_order.all_orders);
    
};
