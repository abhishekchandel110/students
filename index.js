const express = require("express")
const bodyparser = require("body-parser")
const mongoose = require("mongoose")
const Students = require("./student.js")

mongoose.connect(process.env.CONNECTION_STRING);
// 'mongodb+srv://narendrapatidar842:Pn%4096307@cluster0.awejtj4.mongodb.net/test'

const app = express()
app.use(bodyparser.json())
app.use(express.urlencoded({extended: false}))

app.get("/", async function(req, res){
    try{
        const students = await Students.find({})
        console.log(students)
        res.json(students)
    } catch (e) {
        console.log("Error", e.message)
    }
})

app.get("/:id", async function(req, res){
    try{
        const id = req.params.id
        const student = await Students.findOne({_id: id})
       res.json(student)
    } catch(e) {
        console.log("Error", e.message)
    }
   
})

app.post("/", async function(req, res){
    const name = req.body.name;
    const age = req.body.age;

    if(age < 0 && age > 100){
        return res.json({"error": "correct age"})
    }

    try{
        const added = await Students.create({
            name: req.body.name,
            age: req.body.age
        })
        res.json(added)
    }catch (e) {
        console.log("Error", e.message)
    }
})


app.put("/:id", async function(req, res){
    try{
        const id = req.params.id
        const student = await Students.findOne({_id: id})
       const name = req.body.name
       if(req.body.name ){
           student.name = name
       }
       if(req.body.age ){
        student.age = age
       }
       await student.save()
        res.send("Saved your update")
    } catch (e) {
        console.log(e)
    }
 
})

app.delete("/:id", async function(req, res){
    try{
        const id = req.params.id
        const student = await Students.deleteOne({_id: id})
        res.send(student)
    } catch (e) {
        console.log(e)
    }
   
})


app.listen(8000 , function(){
    console.log("start");
})



