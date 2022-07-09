const express = require("express")
const bodyParser= require("body-parser")
const request = require("request")

const port = process.env.PORT || 5000;

const app = new express()



app.use(express.static("public"))

app.use(bodyParser.urlencoded({extended:true}));

app.use(bodyParser.json())

app.set("view engine", "ejs")

app.get("/", (req, res) => {

 res.render("index",{weather:null , error:null});
 console.log("I am working fine on the server ");

});

app.post('/', (req, res) => {
 
    let apiKey="180f066e400a8584107a3dd8103177a3"
    let city =req.body.city
    let url= 'https://api.openweathermap.org/data/2.5/weather?q='+city+'&appid='+apiKey
 
    request(url,function(err,response,body){
       if(err){
       
        res.render("index",{weather:null , error:" Error, Please Try Again !  Enter Correct City"});
 
    }else{
 
        let weather=JSON.parse(body)
 
        if(weather.main==undefined){
            res.render("index",{weather:null , error:" Error, Please Try Again ! "});

           }else{
 
            let weatherMsg="Temperature is :"+(Math.ceil(weather.main.temp-273.15))+" degree celcius with "+weather.weather[0].main+" in "+ weather.name; 
 
            res.render("index",{weather:weatherMsg , error:null});
        
           }
       }
   })
});




app.listen(port, () => `Server running on port ${port} 🔥`);



