require('dotenv').config();
const mongoose=require('mongoose')
mongoose.connect("mongodb+srv://"+process.env.PROFILES_USER+":"+process.env.PROFILES_PASS+"@sas.cgtl0ii.mongodb.net/Profiles",{useNewUrlParser:true})

const schemarest=mongoose.Schema({
    name:String,
    restlink:String,
    picture:String,
    rating:[],
    rating_max:Number,
    rating_max_id:Number,
    time:Number,
    item_id:[],
    restid:Number,
    pricefortwo:Number,
    offer:String
})

const restro=mongoose.model("restro",schemarest) // foods variety schema

let namedb=[];
let ratingdb=[];
let picturedb=[];
let restlinkdb=[];
let timedb=[];
let avgpricedb=[];
let offerdb=[];


const webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;

const driver = new webdriver.Builder()
.forBrowser('chrome')
.build();
driver.get('https://www.swiggy.com').then(async ()=>{
    //_1fiQt button locate
    //find food _3iFC5
    await driver.sleep(3 * 1000);
    await driver.findElement(By.className("_1fiQt")).click();
    await driver.sleep(10 * 1000);
    
    for(let i=0;i<2;i++){
    var locy=1000*(i+1);
    driver.executeScript("window.scroll(0,"+locy+");");
    await driver.sleep(7 * 1000);}

    var restnamesarray = driver.findElements(By.className('nA6kb'))
    restnamesarray.then(function (elements) {
        var pendingHtml = elements.map(async function (elem) {
             var my=await elem.getText();
             namedb[j++]=my;
        });
        j=0;
    });

    //var ratingsarray = driver.findElements(By.className('_9uwBC _2lAlc'))
    // ratingsarray.then(function (elements) {

    //     var pendingHtml = elements.map(async function (elem) {
    //          var my=await elem.childNodes[1].getText();
    //          console.log(my);
    //     });
    // });
    var ratingarray = driver.findElements(By.className('_9uwBC wY0my'))
    ratingarray.then(function (elements) {
        var pendingHtml = elements.map(async function (elem) {
            var my=await elem.getText();
            ratingdb.push(my);
            //  console.log(my);
        });
    });

    let parentdivarray1 = await driver.findElements(By.className('_3Mn31'));
    let l=0;
    let childdivarray1 = await parentdivarray1[0].findElements(By.css('div'));
    while(childdivarray1[l] != undefined){
    let childdivarray2 = await parentdivarray1[l].findElements(By.css('div'));
    var time1=await childdivarray2[l++].getText()
    
    // console.log(time1);
    }
    
    var imagearray = driver.findElements(By.className('_2tuBw _12_oN'))
    imagearray.then(function (elements) {
        var pendingHtml = elements.map(async function (elem) {
             var my=await elem.getAttribute('src');
             picturedb.push(my);
            //  console.log(my);
        });
    });

    var averagepricearray = driver.findElements(By.className('nVWSi'))
    averagepricearray.then(function (elements) {
        var pendingHtml = elements.map(async function (elem) {
             var my=await elem.getText();
             avgpricedb.push(my);
            //  console.log(my);
        });
    });

    var offerarray = driver.findElements(By.className('sNAfh'))
    offerarray.then(function (elements) {
        let k=0;
        var pendingHtml = elements.map(async function (elem) {
             var my=await elem.getText();
             offerdb.push(my);
             console.log(my);
            
        });
    });

    var restlinkarray = driver.findElements(By.className('_1j_Yo'))
    restlinkarray.then(function (elements) {
        let k=0;
        var pendingHtml = elements.map(async function (elem) {
             var my=await elem.getAttribute('href');
             restlinkdb.push(my);
             console.log(my);
        });
    });
     
    let parentdivarray = await driver.findElements(By.className('_3Mn31'));
    let a=0;
    while(parentdivarray[a] != undefined){
    let childdivarray = await parentdivarray[a].findElements(By.css('div'));
    a++;
    var time=await childdivarray[2].getText()
    timedb.push(time);
    // console.log(time);
    }

    
    // await driver.sleep(10 * 1000)

    // console.log(namedb);
    // console.log(picturedb);
    // console.log(timedb);
    // console.log(avgpricedb);
    // console.log(ratingdb);
    // console.log(offerdb);
    // console.log(restlinkdb);

    for(let i=0;i<5;i++){
        var tstr=timedb[i];
        var pstr=avgpricedb[i];
        var newrestro=new restro({
            name:namedb[i],
            restlink:restlinkdb[i],
            picture:picturedb[i],
            rating:[parseFloat(ratingdb[i])],
            rating_max:ratingdb[i],
            rating_max_id:0,
            time:parseInt(tstr.substring(0,2)),
            item_id:[],
            restid:i,
            pricefortwo:parseInt(pstr.substring(1,4)),
            offer:offerdb[i]
        })
        newrestro.save();}
})





