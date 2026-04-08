const mongoose=require("mongoose");

const productschema=new mongoose.Schema({
  name: String,
  price: Number,
  image: String,
});

module.exports=mongoose.model("product", productschema);
