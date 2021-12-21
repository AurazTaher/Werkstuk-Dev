import * as mysql_db from './mysql.js'
import express from 'express';
import mongoDb from 'mongodb'
import bodyParser from 'body-parser';
import mysql from 'mysql'
import dotenv, { parse } from 'dotenv'
dotenv.config()
const mongoClient = mongoDb.MongoClient
const app = express()
const port = process.env.PORT

app.use(bodyParser.json())

const connectionProperties = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT
}

app.listen(port, async ()=>{
    console.log(connectionProperties)	
    console.log(`application running on port ${port}`)
    let film = {
        title: "Catch me if you can",
        director: "Steven spielberg",
        genre_id: 1,
        rating: 10,
        release_date: "2008-08-20"
    }
    // let genre = {
    //     name: "Romantic"
    // }
})

app.get("/api/films", async (req,res) => {
    mysql_db.getAllFilms(mysql,connectionProperties,(err,rows,fields) =>{
        res.send(rows)
    })
})

app.get("/api/films/:id", async (req,res)=>{
    let id = parseInt(req.params.id)
    mysql_db.getFilm(mysql,connectionProperties,id, (err,rows,fields)=>{
        res.send(rows)
    })
})

app.get("/api/films/genre/:id", (req,res)=>{
    let id = parseInt(req.params.id)
    mysql_db.getAllFilmsByGenre(mysql,connectionProperties,id,(err,rows,fields)=>{
        res.send(rows)
    })
})

app.post("/api/films/insert", async (req,res) =>{
    let film = req.body
    mysql_db.insertFilm(mysql,connectionProperties,film,(err,rows,fields)=>{
        res.send(rows)
    })
})

app.put("/api/films/update/:id", async (req,res) =>{
    let id = parseInt(req.params.id)
    let film = req.body
    mysql_db.updateFilm(mysql,connectionProperties,film,id,(err,rows,fields)=>{
        res.send(rows)
    })
})

app.delete("/api/films/delete/:id", async (req,res) => {
    let id = parseInt(req.params.id)
    mysql_db.deleteFilm(mysql,connectionProperties,id,(err,rows,fields)=>{
        res.send(rows)
    })
})

app.get("/api/genres", async (req,res) => {
    mysql_db.getAllGenres(mysql,connectionProperties,(err,rows,fields) =>{
        res.send(rows)
    })
})

app.get("/api/genres/:id", async (req,res)=>{
    let id = parseInt(req.params.id)
    mysql_db.getGenre(mysql,connectionProperties,id, (err,rows,fields)=>{
        res.send(rows)
    })
})

app.post("/api/genres/insert", async (req,res) =>{
    let genre = req.body
    mysql_db.insertGenre(mysql,connectionProperties,genre,(err,rows,fields)=>{
        res.send(rows)
    })
})

app.put("/api/genres/update/:id", async (req,res) =>{
    let id = parseInt(req.params.id)
    let genre = req.body
    mysql_db.updateGenre(mysql,connectionProperties,genre,id,(err,rows,fields)=>{
        res.send(rows)
    })
})

app.delete("/api/genres/delete/:id", async (req,res) => {
    let id = parseInt(req.params.id)
    mysql_db.deleteGenre(mysql,connectionProperties,id,(err,rows,fields)=>{
        res.send(rows)
    })
})
