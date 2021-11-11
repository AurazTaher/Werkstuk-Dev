import assert from 'assert'
import mongoDb from 'mongodb'
import fetch from 'node-fetch'
const mongoClient = mongoDb.MongoClient
import * as db from '../db.js'

describe("unit tests", ()=>{
    let ids = []
    it("insert task", async ()=>{
        let task = {
            Name: "test task",
            Deadline: "2021-11-12T20:00:00.000Z",
            Completed: false
        }
        let addedTask = await db.addTask(mongoClient,task)
        assert.notEqual(addedTask,undefined)
        ids.push(addedTask.insertedId)
    })
    it("update tast", async ()=>{
        let id = ids[0]
        let task = {
            Name: "updated task",
            Deadline: "2021-11-12T20:00:00.000Z",
            Completed: true
        }
        await db.updateTask(mongoClient, id, task)
        let updatedTask = await db.getTask(mongoClient,id)
        assert.equal(updatedTask.Name,"updated task")
    })
    it("delete and get test",async ()=>{
        let id = ids[0]
        await db.deleteTask(mongoClient,id)
        let task = await db.getTask(mongoClient,id)
        assert.equal(task,undefined)
    })
})

describe("integration tests", () => {
    let ids = []
    it("/api/tasks test", async ()=>{
        let response = await fetch("http://localhost:3000/api/tasks")
        let result = await response.json()
        assert.notEqual(result,undefined)
    })
    it("/api/insert", async ()=>{
        let task = {
            name: "add endpoint test",
            deadline: "2021-11-12T20:00:00.000Z",
            completed: false
        }
        let response = await fetch("http://localhost:3000/api/insert",{
            method: "POST",
            body: JSON.stringify(task),
            headers: {
                "Content-Type": "application/json"
            }
        })
        let result = await response.json()
        assert.notEqual(result,undefined)
        ids.push(result._id)
    })
    it("/api/update", async ()=>{
        let id = ids[0]
        let task = {
            name: "update endpoint test",
            deadline: "2021-11-12T20:00:00.000Z",
            completed: true
        }
        let response = await fetch(`http://localhost:3000/api/update/task/${id}`, {
            method: "PUT",
            body: JSON.stringify(task),
            headers: {
                "Content-Type": "application/json"
            }
        })
        let result = await response.json()
        assert.equal(result.name, "update endpoint test")
    })
    it("/api/task", async ()=>{
        let id = ids[0]
        let response = await fetch(`http://localhost:3000/api/task/${id}`)
        let result = await response.json()
        assert.notEqual(result,undefined)
    })
    it("/api/delete", async ()=>{
        let id = ids[0]
        await fetch(`http://localhost:3000/api/delete/task/${id}`,{
            method: "DELETE"
        })
        let deletedTask = await db.getTask(mongoClient,new mongoDb.ObjectId(id))
        assert.equal(deletedTask,undefined)
    })
})