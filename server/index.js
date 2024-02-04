const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');


const app = express()
app.use(cors())
app.use(express.json())
const PORT = process.env.PORT || 8080

// Schema
const schemaData = mongoose.Schema({
    name : String,
    email : String,
    mobile : String,
},{
    timestamps : true
})


const model = mongoose.model("user",schemaData)

app.get('/',async(req,res)=>{
    const data = await model.find({})

    res.json({success :true,data : data});
})

// Create and save data
app.post("/create",async(req,res)=>{
    console.log(req.body)
    const data = new model(req.body)
    await data.save()
    res.send({success:true,message:"data saved successfully"})
})


// update the data

app.put("/update",async(req,res)=>{
    console.log(req.body)
    const {_id:id,...rest} = req.body
    await model.updateOne({_id :id},rest)
    res.send({success : true,message:"data will be updated"})
})

app.delete("/delete/:id",async(req,res)=>{
    const id = req.params.id
    console.log(id)
    const data = await model.deleteOne({_id:id})
    res.send({success : true,message:"data will be deleted"})
})
mongoose.connect("mongodb://127.0.0.1:27017/crud")
.then(()=>{
console.log("Connected")
app.listen(PORT,()=>console.log("Server is running"))
})
.catch((err)=>console.log(err))
 