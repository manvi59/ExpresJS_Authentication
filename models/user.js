const mongoose=require("mongoose");
require("dotenv").config();

// mongoose.connect(process.env.MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// })
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("✅ Connected to MongoDB"))
.catch(err => console.error("❌ MongoDB connection error:", err));

const userSchema=mongoose.Schema({
    username:String,
    email:String,
    password:String,
    age:Number

});

module.exports = mongoose.model("user", userSchema);

// module.exports=mongoose.model("user","userSchema")