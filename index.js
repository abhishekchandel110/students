const express = require("express")

const bodyparser = require("body-parser")
const app = express()
app.use(bodyparser.json())

const db = []

app.get("/", function(req, res){
    res.send(db)
    console.log(db)
})

app.put("/",function(req,res){
    for(let i = 0; i<db.length; i++){
        if(db[i].name===req.body.name){
            db[i].age=req.body.age
        }
    }
    res.send("Saved your update")
})

app.delete("/",function(req,res){
    for(let i = 0; i<db.length; i++){
        if(db[i].name===req.body.name){
            db[i].age===req.body.age
        }
        
    }
    res.delete("deleted")
})
app.listen(8000 , function(){
    console.log("start");
})
