require('dotenv').config();
const express =require('express')
const bodyParser=require('body-parser')
const ejs=require('ejs')
const mongoose=require('mongoose')
mongoose.connect("mongodb+srv://SAS3442:"+process.env.PROFILES_PASS+"@sas.cgtl0ii.mongodb.net/Food",{useNewUrlParser:true})


const app=express()
app.use(express.urlencoded({extended:true}))

const schemaitems=mongoose.Schema({
    name:String,
    picture:String,
    id:Number,
})

const item=mongoose.model("item",schemaitems)

app.get('/additem', function(req, res){
    const newitem=new item({           //added a new items to the food database items collection
        name:"biryani",
        picture:"ssssss",
        id:1,
    })
    newitem.save()
    res.send("dada")
})

app.listen(3001,()=>{
    console.log("server food started")
})