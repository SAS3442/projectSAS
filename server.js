require('dotenv').config();
const express =require('express')
const bodyParser=require('body-parser')
const ejs=require('ejs')

const app=express()

app.set('view engine','ejs')


app.get("/",(req,res)=>{
    const rooturl="https://accounts.google.com/o/oauth2/v2/auth"
    const options={
        redirect_uri:"http://localhost:3000/home",
        
        client_id:process.env.CLIENT_ID.toString(),
        access_type:"offline",
        response_type:"code",
        prompt:"consent",
        scope:[
            "https://www.googleapis.com/auth/userinfo.profile"
        ].join(" ")
    }
    const qs=new URLSearchParams(options);
    res.redirect(`${rooturl}?${qs.toString()}`)
})

app.get("/home",(req,res)=>{
    res.render("home")
})



app.listen(3000,()=>{
    console.log("Server running on port 3000");
})