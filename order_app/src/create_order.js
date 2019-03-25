const Model = require("./db_model");
const crypto= require("crypto");
const rp= require("request-promise");
const { orderModel } = Model;
module.exports = {
      create (req,res){
        orderRef = orderModel();
        orderRef.customer_id=1;
        orderRef.order_checksum=crypto.createHash('sha1').update(Math.random().toString()).digest('hex');
        orderRef.save(async (error,result)=>{
            if(error){throw error}
            else
            {
                var order_id = result.order_id;
              var payment_response = await payment(result.customer_id,result.total_payable_amount,result.order_checksum);
              if(payment_response!=404)
               {
                   var validate = await validate_payment(payment_response,orderRef.order_checksum);
                      if(validate.code==1)
                     {
                       payment_response = JSON.parse(payment_response);
                       await update_order(payment_response.data.result.transaction_id,order_id,"cofirm");
                       console.log("Order confirmed!");
                       const final_order =await update_order(payment_response.data.result.transaction_id,order_id,"Delivered");
                       console.log("Order Delivered!");
                       res.json({status:200,msg:"OK",data:{result:final_order},ui_msg:"Order Delivered sucessfuly!"});
                     }
                   else
                   {
                       console.log("Payment unsucessfull");
                       res.json({status:200,msg:"OK",data:{result:result},ui_msg:"Payment unsucessfull! But order saved."});
                   }
               }
              else
              {  
                  res.json({status:200,msg:"OK",data:{ui_msg:"Payment app is not running! Order saved successfully."}})
              }
            }
            
        })
    }
}

async function payment(customer_id,total_payable_amount,order_checksum)
{
  var options = { method: 'POST',
  url: 'http://payment_app:3001/payment',
  headers: 
   { 
     'cache-control': 'no-cache',
     'Content-Type': 'application/x-www-form-urlencoded' 
   },
  form: { customer_id: '1', total_payable_amount:total_payable_amount,order_checksum:order_checksum } };
 return rp(options).then(function(response){
      return response
  }).catch(function(error){
      console.log(error);
      return 404;
  })
}

async function validate_payment(payment_response,order_checksum)
{
    var obj = {};
    payment_response = JSON.parse(payment_response);
    if(payment_response.data.order_checksum===order_checksum)  // check checksum.
    {
       if(payment_response.data.result.payment_status=="Paid")
       {obj.msg="Payment successful"; obj.code=1;  return obj;}
       else
       {obj.msg="Payment unsuccessfull"; obj.code=0; return obj; }
    }
    else
    {
      obj.msg ="Checksum not matched!"; obj.code=0;
      return obj;
    }
}

async function update_order(transaction_id,order_id,order_state)
{
    var set = {payment_status:true,transaction_id:transaction_id,order_state:order_state};
   return orderModel.findOneAndUpdate({order_id:order_id},{$set:set},{new:true},(error,data)=>{
        if(error) throw error;
        //console.log(data);
    })
}
