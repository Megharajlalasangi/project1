const { log } = require("console");
const express =require("express");
const app=express();
const path=require("path");
const collection=require("./mongodb");
const { name } = require("ejs");

app.use(express.json());
app.set("view engine","ejs");
app.set("views" ,path.resolve("./views"));
app.use(express.urlencoded({extended:false}));


app.get("/" ,(req,res)=>{
    res.render("signin.ejs")
});

app.get("/signup" ,(req,res)=>{
    res.render("signup.ejs")
});

app.post("/signup", async(req,res)=>{
    const data={
        name:req.body.name,
        password:req.body.password,
        email:req.body.email,
        number:req.body.number
    }
    await collection.insertMany([data]);
     res.render("signin");
})
app.post("/signin",async(req,res)=>{
    try{
        const check=await collection.findOne({name:req.body.name});
        if(check.password===req.body.password){
            res.render("home");
        }else{
            res.send("wrong password")
        }

    } 
    catch{
        res.send("wrong name and password")
    }  
})
// delete
app.delete('/users/:id', async (req, res) => {
    try {
      const user = await collection.findByIdAndDelete(req.params.id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json({ message: 'User deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  app.get('/users', async (req, res) => {
    try {
      const users = await collection.find();
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });


  app.put('/users/:id', async (req, res) => {
    const { name, email, number } = req.body;
    try {
      const updatedUser = await collection.findByIdAndUpdate(
        req.params.id,
        { name, email, number },
        { new: true, runValidators: true }
      );
      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(updatedUser);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });






app.listen(3000 , ()=>{
    console.log("port connected");
    
})