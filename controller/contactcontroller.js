const contactmessage=require("../model/contactmessage");

async function savecontact(req,res){
  try {
    const name=(req.body.name||"").trim();
    const email=(req.body.email||"").trim();
    const message=(req.body.message||"").trim();

    if(!name||!email||!message){
      return res.status(400).json({msg:"please fill all fields"});
    }

    const saved=await contactmessage.create({ name, email, message });
    res.status(201).json({msg:"message saved", id:saved._id});
  } catch (err) {
    res.status(500).json({msg:"could not save message"});
  }
}

module.exports={savecontact};
