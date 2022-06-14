const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const Product = require('./models/product');
mongoose.connect('mongodb://localhost:27017/farmStand',{useNewUrlParser:true})
.then(()=>{
	console.log("Connection Open!!!")
})
.catch(err => {
	console.log("Oh no error!!")
	console.log(err)
})



app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');

// Routes
app.get('/dog',(req,res)=>{
	res.send("It is working")
})
app.listen(3000,()=>{
	console.log("Listening to port 3000");
})