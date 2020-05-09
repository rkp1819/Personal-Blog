//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const utils = require(__dirname+"/utils.js")

//DB
const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/postsDB", { useNewUrlParser: true});

const postSchema = mongoose.Schema({
    title: {
      type: String,
      required: [true, "Please use a title"]
    },
    post: {
      type: String,
      required: [true, "but... whats the post"]
    }
});
const Post = new mongoose.model('post', postSchema);



//varibles
const homeStartingContent = "Your Personal Dairy 💖 You can add, delete and edit note according to your choice";
const aboutContent = "";
const contactContent = "";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

//get from DB
app.get('/', function(req, res){
  console.log("home handler");
  utils.findPosts(req, res, Post, homeStartingContent);
});


//get from DB
app.get('/posts/:id', function(req, res){
  utils.findPost(req, res, Post, req.params.id)
});

//store in DB
app.post('/', function(req, res){
 utils.storePost(req, res, Post);
 res.redirect("/");
});


app.get('/about', function(req, res){
  res.render('about',{aboutContent: aboutContent});
});

app.get('/contact', function(req, res){
  res.render('contact',{contactContent: contactContent});
});

app.get('/compose', function(req, res){
  res.render('compose');
});









app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), function() {
  console.log("Server started on port : "+app.get('port'));
});
