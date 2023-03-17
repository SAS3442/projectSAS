const express =require('express')
const bodyParser=require('body-parser')

const app=expres()

app.get('/',()=>{
    res.send("HI");
})

app.listen(3000,()=>{
    console.log("Server running on port 3000");
})