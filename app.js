const express = require("express");
const bodyParser = require("body-parser") 
const mongoose = require("mongoose")

const app = express();
mongoose.connect("mongodb://127.0.0.1:27017/articalDB")

const articleSchema = mongoose.Schema({
    title:String,
    content:String
})

const Artical = mongoose.model("hhs",articleSchema)

app.get("/",function(req,res){
    Artical.find(function(error,foundArticels){
        if(!error){
            res.send(foundArticels)
        }else{
            console.log(error);
            res.send("No data found");
        }
    })
})

app.post("/",function(req,res){
    console.log(req.body.title)
    console.log(req.body.content)

    const newArtical = new Artical({
    title:req.body.title,
    content:req.body.content
})
newArtical.save(function(error){
    if(!error){
        res.send("recode inserted")
    }else{
        res.send(error);
    }
})

})




app.use(express.urlencoded({extended:true}));

app.listen("3005",function(){
    console.log("server is up @ http://localhost:3005/")
})