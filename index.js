const express = require("express");
const cors = require("cors");
const app = express();
const fs = require("fs")
const conn = require('./database.js');
app.use(cors());

app.get('/login',(req,res)=>{

    conn.query("select * from login_details ",(err,info)=>{
        if(err){
            res.send({
                message:err.message,
                status:400
            })
        }
        else{
            console.log(info);
            fs.writeFile("./data.json",JSON.stringify(info),(err)=>{
                if(err){
                    res.send(err.message);
                }
                else{
                    res.send(info);
                }
            })
        }
    })

});

let port = 3002;
app.listen(port,()=>{
    console.log(`server started at http://localhost:${port}`);
})