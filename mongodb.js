const mongoose =require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/user_db").then(()=>{
console.log("mongodb connected");

});

const LogInSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,

    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    number:{
        type:Number,
        required:true
    }
});
const collection=new mongoose.model("collection1",LogInSchema)

module.exports=collection;