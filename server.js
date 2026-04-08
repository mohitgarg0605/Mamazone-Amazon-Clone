require("dotenv").config();
const express=require("express");
const path=require("path");
const connectdb=require("./config/db");
const productroutes=require("./routes/productroutes");
const contactroutes=require("./routes/contactroutes");
const app=express();
const port=process.env.PORT||5000;
connectdb();
app.use(express.json());
app.use("/api/products", productroutes);
app.use("/api/contact", contactroutes);
app.use("/css", express.static(path.join(__dirname, "public", "css")));
app.use("/js", express.static(path.join(__dirname, "public", "js")));
app.use("/public", express.static(path.join(__dirname, "public")));
app.use("/data", express.static(path.join(__dirname, "data")));
app.use("/partials", express.static(path.join(__dirname, "view", "partials")));
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "view", "home.html"));
});
app.get("/products", function (req, res) {
  res.sendFile(path.join(__dirname, "view", "products.html"));
});
app.get("/contact", function (req, res) {
  res.sendFile(path.join(__dirname, "view", "contact.html"));
});
app.listen(port, function () {
  console.log("server started on port "+port);
});
