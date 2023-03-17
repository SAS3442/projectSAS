const express =require('express')
const bodyParser=require('body-parser')

const app=express()

app.set('view engine','ejs')

app.get('/',(req,res)=>{
    res.render("login");
})

app.listen(3000,()=>{
    console.log("Server running on port 3000");
})