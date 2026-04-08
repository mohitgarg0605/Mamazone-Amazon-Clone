const mongoose=require("mongoose");

mongoose.set("bufferCommands", false);

async function connectdb() {
  try {
    await mongoose.connect(process.env.MONGO_URI||"mongodb://127.0.0.1:27017/mamazon", {
      serverSelectionTimeoutMS: 10000,
    });
    console.log("mongo connected");
  } catch (err) {
    console.log("mongo error:", err.message);
  }
}

module.exports=connectdb;