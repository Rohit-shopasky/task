const Model = require("./db_model");
const randomBool = require('random-bool');


const { paymentModel } = Model;

module.exports = {
    pay : (req,res)=>{
         let {customer_id='',total_payable_amount='',order_checksum=''} = req.body;
         var rand_bool = randomBool({ likelihood: 50 });  // 50% chance of order cancel or order success
         var paymentRef = paymentModel();
         if(rand_bool)
         {
             paymentRef.customer_id = customer_id;
             paymentRef.total_payable_amount = total_payable_amount;
             paymentRef.payment_status = "Paid";

         }
         else
         {
            paymentRef.customer_id = customer_id;
            paymentRef.total_payable_amount = total_payable_amount;
            paymentRef.payment_status = "Unpaid";
         }

         paymentRef.save(function(error,result){
             if(error) throw error;
             
             result.order_checksum=order_checksum;
             console.log(result);
             res.json({status:200,msg:"OK",data:{result:result,order_checksum:order_checksum}});
         })


    }
}