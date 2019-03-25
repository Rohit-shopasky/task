# task
I have used docker and containerized entire application into 3 containers
   1) Order app
   2) Payment app
   3) Mongodb
   
 # Important Notice
  I have already pushed entire code on AWS EC2 for your convinience.
  You need postman to check apis
  here is the postman collection url https://www.getpostman.com/collections/5f50c28d9e8708ff8109
  
  Api endpoints
  1) 13.233.184.121:3000/create_order          --> POST Request
     Creates new order also invoke payment app for transaction. Payment randomly accept or denies transaction
     
  2) 13.233.184.121:3000/cancel_order          --> PUT Request
     Cancels an order. It requires order_id param.
     
  3) 13.233.184.121:3000/check_order_status   --> GET Request
     Returns order status. Requires param order_id. If no param is given then it returns all order status.
   
   4) 13.233.184.121:3000/show_all_orders    --> GET Request
      Show all orders
If you still want to setup this app on your localhost you can follow below steps.

# Environment Setup
  1) Install Docker
  2) Install Docker compose.
 
  You can easily setup above environment read this link https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-on-ubuntu-16-04
  After installing docker and docker compose type below commands to run application
  $ git clone git@github.com:Rohit-shopasky/task.git
  $ cd task
  
  $ sudo docker-compose up -d    
  or
  $ docker-compose up -d
  
  Above commands starts Order_app on port 3000 and Payment app on 3001 port. Also mongodb on port 27017. Make these ports are free
  
  # See logs
  If you want see docker logs of both the apps
  1) docker logs -f payment_app
  2) docker logs -f order_app
  
  
 
      
  
