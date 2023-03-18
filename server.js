require('dotenv').config();
const express =require('express')
const bodyParser=require('body-parser')
const ejs=require('ejs')
const {google} = require('googleapis');

const app=express()

app.set('view engine','ejs')

const oauth2Client= new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.REDIRECT_URL
);

const url = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope:process.env.SCOPES
  });

app.get("/",(req,res)=>{
    res.redirect(url)
})

app.get("/home",(req,res)=>{
    res.render("home")
})



app.listen(3000,()=>{
    console.log("Server running on port 3000");
})