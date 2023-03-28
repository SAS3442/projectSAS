require('dotenv').config();
const express =require('express')
const bodyParser=require('body-parser')
const ejs=require('ejs')
const mongoose=require('mongoose')
mongoose.connect("mongodb+srv://"+process.env.PROFILES_USER+":"+process.env.PROFILES_PASS+"@sas.cgtl0ii.mongodb.net/Profiles",{useNewUrlParser:true})


const app=express()
app.use(express.urlencoded({extended:true}))

const schemaitems=mongoose.Schema({
    name:String,
    picture:String,
    restraunt:String,
    rating:[],
    rating_Max:Number,
    ratingmax_Id:Number,
    price:Number,
    time:String,
    description:String,
    id:Number,
})

const item=mongoose.model("item",schemaitems)

app.get('/additem', function(req, res){
    const newitem=new item({           //added a new items to the food database items collection
    name:"pizza",
    picture:'afff',
    restraunt:"mylari",
    rating:[4.1,4.3,4.5],
    rating_max:4.5,
    ratingmax_id:2,
    price:103,
    time:"22mins",
    description:"we serve tasty pizza must try once we serve tasty pizza must try once",
    id:1,
    })
    newitem.save()
    res.send("dada")
})

app.listen(3001,()=>{
    console.log("server food started")
})