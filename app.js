// jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");

const app = express();
app.set("view engine","ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({
  extended: true
}));

const groceriesList=["Groceries","Pulses"];
const fashionList=["Fashion","cosmetics"];
const veggiesList=["Veggies"];


mongoose.connect("mongodb://localhost:27017/usersDb", {
  useNewUrlParser: true
});

const userSchema = new mongoose.Schema({
  email: String,
  password: String
});
const User = mongoose.model("User", userSchema);


app.get("/", function(req, res) {
  // .log("server running");
  res.sendFile(__dirname + "/index.html");
});


app.get("/:sects",function(req,res){
  const name=req.params.sects;
  let nList=groceriesList;
  if(name==="fashion"){
    nList=fashionList;
  }
  else if(name==="veggies"){
    nList=veggiesList;
  }

  console.log(nList);
  res.render("layOut",{contentName:name, contentList:nList});
});
app.post("/signin", function(req, res) {
  const user = new User({
    email: req.body.email,
    password: req.body.password
  });
  user.save(function(err){
    if(!err){
      console.log("user saved successfully");
    }
    else{
      console.log(err);
    }
  });
res.render("home");
});
app.listen(3000, function(req, res) {
  console.log("server up");
});
