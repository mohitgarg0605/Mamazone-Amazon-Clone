const express=require("express");
const {savecontact}=require("../controller/contactcontroller");

const router=express.Router();

router.post("/", savecontact);

module.exports=router;
