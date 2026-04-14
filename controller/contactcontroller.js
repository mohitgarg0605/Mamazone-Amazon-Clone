const contactmessage=require("../model/contactmessage");

async function savecontact(req,res){
  try {
    const name=(req.body.name||"").trim();
    const email=(req.body.email||"").trim();
    const message=(req.body.message||"").trim();

    if(!name||!email||!message){
      return res.status(400).json({msg:"sab fields bharo"});
    }

    const saved=await contactmessage.create({ name, email, message });
    res.status(201).json({msg:"save ho gaya", id:saved._id});
  } catch (err) {
    res.status(500).json({msg:"save nahi hua"});
  }
}

module.exports={savecontact};
