"use strict";

const payment = require("./payment");
// all end points of orderer app are listed here

module.exports = function(app) {

app.post("/payment",payment.pay);

    
};
