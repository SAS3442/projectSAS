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

const url = oauth2Client.generateAuthUrl({   //creating the auth url from the information in env file
    access_type: 'offline',
    scope:process.env.SCOPES
  });

async function reqfunction(code){
    const {tokens} = await oauth2Client.getToken(code)
    oauth2Client.setCredentials(tokens);
    const twenty=await 20;

    await new Promise((resolve, reject) =>{
        setTimeout(resolve,1000);
    });

    console.log(tokens);
    return [tokens.id_token,tokens.access_token];             //geting the token from google auth
}


app.get("/",(req,res)=>{
    res.redirect(url) //using the auth url
})

app.get("/home", async (req,res)=>{
    //get the token from qs
    const code=req.query.code.toString();
    //get the id and access token with the code
    const [id_token,access_tocken]= await reqfunction(code);
    console.log([id_token,access_tocken])  //values are coming for now in terms of array change this to object and change name of the fucntion
    //get users with tocken

    //upsert the token

    //create a new session

    //create access & refresh token

    //set cookies

    //redirect back
    res.render("home")
})



app.listen(3000,()=>{
    console.log("Server running on port 3000");
})