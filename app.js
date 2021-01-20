const { json, query } = require("express");
const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({extended : "true"}));

app.get("/" , function(req , res){

    res.sendFile(__dirname + "/index.html");

  
})

app.post("/" , function(req,res){
    console.log(req.body.cityName);

    const query = req.body.cityName;
    const key = "f38a8795737bcb72992cc7dd6ec1ca78";
    const unit = "metric";

    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + key + "&units=" + unit;

    https.get(url , function(response){
        console.log(response.statusCode);

        response.on("data", function(data){
            const weatherApp = JSON.parse(data);
            console.log(weatherApp);
        const temp = weatherApp.main.temp;
        const description = weatherApp.weather[0].description;
        const icon = weatherApp.weather[0].icon;
        const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
        res.write("<p>The weather description is " + description + "</p>");
        res.write("<h1>The temperature in " + query +" is " + temp + " degree celsius</h1>");
        res.write("<img src =" + imageURL + ">");
        res.send();
 
        })
    })

})







app.listen(3000 , function(){
    console.log("server is up and running.")   
})