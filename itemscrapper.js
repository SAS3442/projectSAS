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
    time: Number,
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
    time: Number,
    item_id: [],
    restid: Number,
    pricefortwo: Number,
    offer: String
})

let restlinkarray = [];
let namesarray = [];
let rupeearray = [];
let picturearray = [];


const restro = mongoose.model("restro", schemarest) // foods variety schema

restro.find({})
    .then((founditems) => {
        founditems = JSON.parse(JSON.stringify(founditems))
        for(let a=0;a<founditems.length;a++){
            let element=founditems[a];
            const webdriver = require('selenium-webdriver'),
                By = webdriver.By,
                until = webdriver.until;

            const driver = new webdriver.Builder()
                .forBrowser('chrome')
                .build();

            driver.get(element.restlink).then(async () => {
                await driver.sleep(3 * 1000);

                var names = driver.findElements(By.className("styles_itemNameText__3ZmZZ"))
                names.then(function (elements) {
                    var pendingHtml = elements.map(async function (elem) {
                        var my = await elem.getText();
                        namesarray.push(my);
                    });
                });
                await driver.sleep(2 * 1000);

                var rupees = driver.findElements(By.className("rupee"))
                rupees.then(function (elements) {
                    var pendingHtml = elements.map(async function (elem) {
                        var my = await elem.getText();
                        rupeearray.push(my);
                    });
                });
                await driver.sleep(2 * 1000);

                var imagearray = driver.findElements(By.className('styles_itemImage__3CsDL'))
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
                let restrauntname = driver.findElements(By.className('RestaurantNameAddress_name__2IaTv'));
                restrauntname.then(function (elements) {
                    var pendingHtml = elements.map(async function (elem) {
                        var my = await elem.getText();
                        restroname = my;
                    });
                });
                await driver.sleep(2 * 1000);

                let avgprice = driver.findElements(By.className('RestaurantTimeCost_item__2HCUz'));
                avgprice.then(function (elements) {
                    var pendingHtml = elements.map(async function (elem) {
                        var my = await elem.getText();
                        apt = my;
                        console.log(apt);
                    });
                });

                let ratingrest = driver.findElements(By.className('RestaurantRatings_avgRating__1TOWY'));
                ratingrest.then(function (elements) {
                    var pendingHtml = elements.map(async function (elem) {
                        var my = await elem.getText();
                        ratingrestro = my;
                        // console.log(ratingrestro);
                    });
                });
                await driver.sleep(3 * 1000)
                for (let i = 0; i < namesarray.length; i++) {
                    const newitem = new item({
                        name: namesarray[i],
                        picture: picturearray[i],
                        restraunt: restroname,
                        rating: [parseFloat(ratingrestro)],
                        rating_max: ratingrestro,
                        ratingmax_id: 0,
                        price: rupeearray[i],
                        time: element.time,
                        description: "huoo",
                        id: itemsid
                    })
                    // console.log(restroname,newitem);
                    itemsid += 1;
                    newitem.save();
                }
                console.log(element._id)
                await restro.updateOne({_id:element._id},{$set:{pricefortwo: parseInt(apt.substring(1, 4)),name: restroname,
                    restlink: element.link,
                    rating: [parseFloat(ratingrestro)],
                    rating_max: ratingrestro,
                    rating_max_id: 0,
                    item_id: [0, itemsid]}}) 
                });
        }
    })

                        