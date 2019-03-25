const Model = require("./db_model");

const { orderModel } = Model;

module.exports = {
    cancel: (req,res) =>{
        let order_id = req.body.order_id;
        let set = {order_state:'cancel'};
        orderModel.findOneAndUpdate({order_id:order_id},{$set:set},{new:true},(error,result)=>{
            if(error) throw error;
            if(result)
            res.json({status:200,msg:'OK',data:{ui_msg:"Order canceled",order_id:result.order_id}})
            else
            res.json({status:200,msg:"OK",data:{ui_msg:'Order not found!'}});
        })
    }
}