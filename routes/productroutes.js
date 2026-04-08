const express=require("express");
const {getproducts,seedproducts}=require("../controller/productcontroller");

const router=express.Router();

router.get("/",getproducts);
router.post("/seed",seedproducts);

module.exports=router;
