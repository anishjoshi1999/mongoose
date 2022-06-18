const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Product = require('./models/product');
const methodOverride = require('method-override');
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
// override with POST having ?_method=""
app.use(methodOverride('_method'));

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
app.get('/products',async (req,res)=>{
	const products = await Product.find({});
	res.render('products/index',{products})
})
// load a form to create a new product
app.get('/products/new',(req,res)=>{
	res.render('products/new')
})
app.post('/products',async (req,res)=>{
	const newProduct = req.body;
	await Product.create({...newProduct},(err,product)=>{
		if(err){
			console.log(err)
		}else{
			res.redirect('/products')
		}
	})
})
app.get('/products/:id',async (req,res)=>{
	const { id } = req.params;
	const product = await Product.findById(id)
	res.render('products/show',{product});

})
// form to update a product
app.get('/products/:id/edit',async (req,res)=>{
	const { id } = req.params;
	const product = await Product.findById(id);
	res.render('products/edit',{product})
})
app.put('/products/:id',async (req,res)=>{
	const { id } = req.params;
	const product = await Product.findByIdAndUpdate(id,req.body,{runValidators:true,new:true})
	res.redirect('/products');

})
app.delete('/products/:id',async(req,res)=>{
	const {id} = req.params;
	await Product.findByIdAndDelete(id)
	res.redirect('/products')
})


app.listen(3000,()=>{
	console.log("Listening to port 3000");
})