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
// To insert a single item
const p = new Product({
	name:'Graph',
	price:2.5,
	category:'fruit'
})

// p.save().then(p=>{
// 	console.log(p)
// })
// .catch(e => {
// 	console.log(e)
// })
const seedProducts = [
{
	name:'Apple',
	price:250,
	category:'fruit'
},
{
	name:'Tomato',
	price:100,
	category:'vegetable'
},
{
	name:'icecream',
	price:25,
	category:'dairy'
},
{
	name:'banana',
	price:60,
	category:'fruit'
}
]
Product.insertMany(seedProducts)
.then(res => {
	console.log(res)
})
.catch(err => {
	console.log("Oh no mongo connection error");
	console.log(err);
})