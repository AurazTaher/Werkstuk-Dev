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

app.get("/api/task/:id", async (req,res)=>{
    let id = new mongoDb.ObjectId(`${req.params.id}`)
    let task = await db.getTask(mongoClient,id)
    res.send(task)
})

app.post("/api/insert", async (req,res) =>{
    let task = req.body
    await db.addTask(mongoClient,task)
    res.send(task)
})

app.put("/api/update/task/:id", async (req,res) =>{
    let id = new mongoDb.ObjectId(`${req.params.id}`)
    let newTask = req.body
    await db.updateTask(mongoClient,id,newTask)
    let task = await db.getTask(mongoClient,id)
    res.send(task)
})

app.delete("/api/delete/task/:id", async (req,res) => {
    let id = new mongoDb.ObjectId(`${req.params.id}`)
    await db.deleteTask(mongoClient, id)
    res.send(`task with id: ${id} has been deleted`)
})