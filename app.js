const express = require("express")
const app = express()
const port = 3000

app.listen(port, ()=>{
    console.log(`application running on port ${port}`)
})

app.get("/api/tasks", (req,res) => {
    res.send("get endpoint")
})  

app.put("/api/update/task/:id", (req,res) =>{
    res.send("Update endpoint " + req.params.id)
})

app.delete("/api/delete/task/:id", (req,res) => {
    res.send("Delete endpoint " + req.params.id)
})