const express = require("express")
const bodyparser = require("body-parser")
const mongoose = require("mongoose")
const Students = require("./student.js")
// const username = "kanhaiyapatidar94"
// const password = "kp@12345"

mongoose.connect(process.env.CONNECTION_STRING)

const app = express()
app.use(bodyparser.urlencoded({extended:false}))



app.get("/", async function(req, res){
     
    
   try {
        const students = await Students.find({})
        res.send(students)
   } catch(e) {
        console.log("Error" , e.message);
   }
})


app.get("/:id", async function(req, res){
    const id = req.params.id
    const student = await Students.find({ _id: id })
         res.send(student)
 })



app.post("/", async function(req, res){
    
    const age = req.body.age

   

    if(age < 0 ){
        return res.json({"error": "age cannot be smaller then zero "})
    }
    if(age > 100){
        return res.json ({"error": "age cannot be biger then 100"})
    }


     try{
        const students = await Students.create({
            name: req.body.name,
            age: req.body.age
        })
        res.send(students)
     } catch(e) {
        console.log("Error" , e.message);
   }
})

app.put("/:id", async function(req,res){
    
    try{
    const id = req.params.id
    const student = await Students.findOne({ _id: id})
    student.name = req.body.name  
    await student.save()
    res.json({"message": "success"})
    } catch (e){
        console.log(e);
    }
})

app.delete("/:id", async function(req,res){
    try{
        const id = req.params.id
        const student = await Students.deleteOne({_id: id})
        res.send(student)
    } catch(e){
        console.log(e);
    }
   

})
app.listen(8000 , function(){
    console.log("start");
})