const product=require("../model/product");
const sampleproducts=require("../data/products.json");

async function getproducts(req,res){
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
	try{
		const count=await product.countDocuments();
		if(count===0){
			await product.insertMany(sampleproducts);
			return res.json({msg:"sample products inserted"});
		}
		res.json({msg:"products already exist"});
	}catch(err){
		res.status(503).json({msg:"mongo not ready, product seed skipped"});
	}
}

module.exports={getproducts,seedproducts};
