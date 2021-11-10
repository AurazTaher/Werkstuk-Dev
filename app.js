import * as db from './db.js'
import express from 'express';
import mongoDb from 'mongodb'
import bodyParser from 'body-parser';
const mongoClient = mongoDb.MongoClient
const app = express()
const port = 3000

app.use(bodyParser.json())

app.listen(port, ()=>{
    console.log(`application running on port ${port}`)
})

app.get("/api/tasks", async (req,res) => {
    let tasks = await db.getTasks(mongoClient)
    res.send(tasks)
})

app.put("/api/insert", async (req,res) =>{
    let task = req.body
    db.addTask(task,mongoClient)
    res.send(task)
})

app.put("/api/update/task/:id", (req,res) =>{
    //TODO
    res.send("Update endpoint " + req.params.id)
})

app.delete("/api/delete/task/:id", (req,res) => {
    //TODO
    res.send("Delete endpoint " + req.params.id)
})