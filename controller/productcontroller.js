const product=require("../model/product");
const sampleproducts=require("../data/products.json");
const mongoose=require("mongoose");

async function getproducts(req,res){
	if(mongoose.connection.readyState!==1){
		return res.json(sampleproducts);
	}

	try{
		const list=await product.find();
		if(Array.isArray(list)&&list.length>0){
			return res.json(list);
		}
		res.json(sampleproducts);
	}catch(err){
		res.json(sampleproducts);
	}
}

async function seedproducts(req,res){
	if(mongoose.connection.readyState!==1){
		return res.status(503).json({msg:"db ready nahi hai"});
	}

	try{
		await product.deleteMany({});
		await product.insertMany(sampleproducts);
		res.json({msg:"products add ho gaye"});
	}catch(err){
		res.status(503).json({msg:"db ready nahi hai"});
	}
}

module.exports={getproducts,seedproducts};
