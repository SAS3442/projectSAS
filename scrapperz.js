require('dotenv').config();
const mongoose = require('mongoose')
mongoose.connect("mongodb+srv://" + process.env.PROFILES_USER + ":" + process.env.PROFILES_PASS + "@sas.cgtl0ii.mongodb.net/Profiles", { useNewUrlParser: true })

const schemaitems = mongoose.Schema({
    name: String,
    picture: String,
    restraunt: String,
    rating: [],
    rating_max: Number,
    ratingmax_id: Number,
    price: Number,
    time: String,
    description: String,
    id: Number
})

let itemsid = 0;

const item = mongoose.model("item", schemaitems) // foods variety schema

const schemarest = mongoose.Schema({
    name: String,
    restlink: String,
    picture: String,
    rating: [],
    rating_max: Number,
    rating_max_id: Number,
    time: String,
    item_id: [],
    restid: Number,
    pricefortwo: Number,
    offer: String
})

const restro = mongoose.model("restro", schemarest) // foods variety schema

const webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;

const driver = new webdriver.Builder()
    .forBrowser('chrome')
    .build();

    var namesarray = [];
    var rupeearray = [];
    var picturearray = [];


driver.get('https://www.eatsure.com/firangi-bake/mysore/vijay-nagar-mys').then(async () => {
    //_1fiQt button locate
    //find food _3iFC5
    await driver.sleep(3 * 1000);
    var names = driver.findElements(By.className("style__Box-b53t4q-0 ieBjNA"))
    names.then(function (elements) {
        var pendingHtml = elements.map(async function (elem) {
            var my = await elem.getText();
            
            namesarray.push(my);
        });
    });
    await driver.sleep(2 * 1000);

    var rupees = driver.findElements(By.className("price-label"))
    rupees.then(function (elements) {
        var pendingHtml = elements.map(async function (elem) {
            var my = await elem.getText();
            
            rupeearray.push(my);
        });
    });
    await driver.sleep(2 * 1000);

    var imagearray = driver.findElements(By.className('LazyLoadImg__Image-sc-10g7mdq-0 dSiJbK loaded'))
    imagearray.then(function (elements) {
        var pendingHtml = elements.map(async function (elem) {
            var my = await elem.getAttribute('src');
            if (my !== null) {
                picturearray.push(my);
            }
        });
    });
    await driver.sleep(2 * 1000);

    let apt;
    let restroname;
    let ratingrestro;
    // let rating=driver.findElements(By.className('styles_itemImage__3CsDL'));
    let restrauntname = driver.findElements(By.className('style__BrandName-p7ijs4-11 kNxxtn'));
    restrauntname.then(function (elements) {
        var pendingHtml = elements.map(async function (elem) {
            var my = await elem.getText();
            restroname = my;
        });
    });
    await driver.sleep(2 * 1000);

    let ratingrest = driver.findElements(By.className('sc-1q7bklc-1 cILgox'));
    ratingrest.then(function (elements) {
        var pendingHtml = elements.map(async function (elem) {
            var my = await elem.getText();
            ratingrestro = 4.2;
            // console.log(ratingrestro);
        });
    });
    var time1;
    let time = driver.findElements(By.className('title'));
    time.then(function (elements) {
        var pendingHtml = elements.map(async function (elem) {
            var my = await elem.getText();
            time1 = "34";
            // console.log(ratingrestro);
        });
    });
    await driver.sleep(3 * 1000)
    for (let i = 0; i <namesarray.length; i++) {
        const newitem = new item({
            name: namesarray[i],
            picture: picturearray[i],
            restraunt: restroname,
            rating: [parseFloat(ratingrestro)],
            rating_max: ratingrestro,
            ratingmax_id: 2,
            price: rupeearray[i].substring(1,4),
            time: time1,
            description: "huoo",
            id: itemsid
        })
        // console.log(restroname,newitem);
        itemsid += 1;
        newitem.save();
    }

    const newrestro=new restro({
        name: restroname,
            restlink: "https://www.eatsure.com/firangi-bake/mysore/vijay-nagar-mys",
            rating: [parseFloat(ratingrestro)],
            rating_max: ratingrestro,
            rating_max_id: 2,
            item_id: [0, itemsid]
    })

     await newrestro.save()
});
