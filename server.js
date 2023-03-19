require('dotenv').config();
const express =require('express')
const bodyParser=require('body-parser')
const ejs=require('ejs')
const {google} = require('googleapis');
const jwt_decode = require('jwt-decode');
const session=require('express-session')
const mongoose=require('mongoose')
const mongodbsession=require('connect-mongodb-session')(session)
mongoose.connect("mongodb+srv://SAS3442:"+process.env.PROFILES_PASS+"@sas.cgtl0ii.mongodb.net/Profiles",{useNewUrlParser:true})

const app=express()
app.use(express.urlencoded({extended:true}))
app.use(express.static('public'))

const store=new mongodbsession({
    uri:"mongodb+srv://SAS3442:"+process.env.PROFILES_PASS+"@sas.cgtl0ii.mongodb.net/Profiles",
    collection:"mysession"
})

app.use(session({
    secret:"hello welcome",
    resave:false,
    saveUninitialized:false,
    store:store,
}
))

const schemaProfile=mongoose.Schema({
    username:String,
    picture:String,
    id:Number,
})

const User=mongoose.model("user",schemaProfile)

app.set('view engine','ejs')

const oauth2Client= new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.REDIRECT_URL
);

const url = oauth2Client.generateAuthUrl({   
    //creating the auth url from the information in env file
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
    return [tokens.id_token,tokens.access_token];             
    //geting the token from google auth
}

const isOauth=(req,res,next)=>{
    if(req.session.isOauth){
        next()
    }
    else{
        res.redirect("/")
    }
}

app.get("/",(req,res)=>{
    if(req.session.isOauth){
        res.redirect("/homepage")
    }else{
    res.redirect(url) //using the auth url
}})

app.get("/login",(req,res)=>{
    res.render("login")
})

app.get("/home", async (req,res)=>{
    //get the token from qs
    const code=req.query.code.toString();
    //get the id and access token with the code
    const tokenarr= await reqfunction(code); //values are coming for now in terms of array change this to object and change name of the fucntion
    //get users with token
    const decoded=jwt_decode(tokenarr[0].toString()); //got the data object of the user
    console.log(decoded);
    //upsert the token
    const newUser=new User({  //added a new user to the profile database users collection
        username:decoded.name,
        picture:decoded.picture,
        id:1,
    })
    newUser.save()
    
    req.session.isOauth=true;
    res.redirect("/homepage")
})

app.get("/homepage",isOauth,(req,res)=>{

    res.render("home")
})


app.listen(3000,()=>{
    console.log("Server running on port 3000");
})