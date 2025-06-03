
//import { createPool } from 'mysql'
const {createPool} =require('mysql')
 

//Database Part
const pool=createPool({
    host:"127.0.0.1:3310",
    user:"admin",
    password:"Welcome@123",
    connectionLimit:"10"
  })


  pool.query(`SELECT * FROM cellma4_api_18may23.patients`,(err,resp)=>{
   
   if(err)
   {
    console.log(err)
   }
   else{
    var r=JSON.parse(JSON.stringify(resp))
    console.log(r[0])
    console.log(r[1])
    console.log(r[2])
    console.log(r[3])

   }
    //return console.log(resp)  

  })
  