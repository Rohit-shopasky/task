const Model = require("./db_model");

const { orderModel } = Model;

module.exports = {

    show_order_state: (req,res) =>{
       let order_id = req.query.order_id;
       if(order_id===undefined)           // if order_id param is not given then show all orders status 
       {
          orderModel.find({},(error,result)=>{
              if(error) throw error;
              var all_data = new Array();
              result.forEach(element=>{
                  var obj={};
                  obj.order_id=element.order_id;
                  obj.order_state = element.order_state;
                  all_data.push(obj);
              })
              res.json({status:200,msg:'OK',data:{result:all_data}});
          })
       }
       else   // otherwise show only specific order status
       {
       orderModel.findOne({order_id:order_id},(error,result)=>{
           if(error) throw error;
           res.json({status:200,msg:'OK',data:{order_state:result.order_state,order_id:result.order_id}});
       })
       }
       
    },

    all_orders:(req,res) =>{
           orderModel.find({},(error,result)=>{
               res.json({status:200,msg:"OK",data:{result:result}})
           })
    }



}