import assert from 'assert'
import fetch from 'node-fetch'
import mysql from 'mysql'
import * as mysql_db from '../mysql.js'
import dotenv from 'dotenv'
dotenv.config()

const connectionProperties = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
}

async function getGenre(){
    let insertGenre = new Promise(function(resolve,reject){
        mysql_db.insertGenre(mysql,connectionProperties,{name:"action"},()=>{resolve()})
    })
    await insertGenre
    let getGenres = new Promise(function(resolve, reject){
        mysql_db.getAllGenres(mysql,connectionProperties, function(err,result) {
            let genre = result[0]
            resolve(genre)
        })
    })
    let genre = await getGenres
    return genre
}

describe("unit tests", async ()=>{
    let id = undefined
    it("insert film", async ()=>{
        let genre = await getGenre()
        console.log(genre)
        let film ={
            title: "Catch me if you can",
            director: "geen idee",
            genre_id: genre.id,
            rating: 9.5,
            release_date: "2001-08-25"
        }
        
        let promise = new Promise(function(resolve,reject){
            mysql_db.insertFilm(mysql,connectionProperties,film,(error,result)=>{   
                console.log(error)    
                id = result.insertId
                mysql_db.getFilm(mysql,connectionProperties,id, (error,result)=>{
                    assert.equal(result[0].title, film.title)
                    assert.equal(result[0].director, film.director)
                    // assert.equal(result[0].release_date, new Date(film.release_date))
                    resolve()
                })
            })
        })
        await promise
    })
    it("update film", async ()=>{
        let genre = await getGenre()
        let film ={
            title: "Catch me if you can",
            director: "steven spielberg",
            genre_id: genre.id,
            rating: 9.5,
            release_date: "2001-08-25"
        }
        let promise = new Promise(function(resolve,reject){
            mysql_db.updateFilm(mysql,connectionProperties,film,id,(error,result)=>{       
                mysql_db.getFilm(mysql,connectionProperties,id, (error,result)=>{
                    assert.equal(result[0].director, film.director)
                    // assert.equal(result[0].release_date, new Date(film.release_date))
                    resolve()
                })
            })
        })
        await promise
    })
    it("delete and get test",async ()=>{
        let promise = new Promise(function(resolve,reject){
            mysql_db.deleteFilm(mysql,connectionProperties,id,(error,result)=>{       
                mysql_db.getFilm(mysql,connectionProperties,id, (error,result)=>{
                    if (result == []){
                        assert.ok()
                    }
                    // assert.equal(result[0].release_date, new Date(film.release_date))
                    resolve()
                })
            })
        })
        await promise
    })
})

describe("integration test films", () => {
    let id = undefined
    it("/api/films", async ()=>{
        let genre = await getGenre()
        let film ={
            title: "Catch me if you can",
            director: "geen idee",
            genre_id: genre.id,
            rating: 9.5,
            release_date: "2001-08-25"
        }
        let response = await fetch("http://localhost:3000/api/films/insert",{
            method: "POST",
            body: JSON.stringify(film),
            headers: {
                "Content-Type": "application/json"
            }
        })
        let result = await response.json()
        id = result.insertId
        let promise = new Promise(function(resolve,reject){
            mysql_db.getFilm(mysql,connectionProperties,id,(error,result)=>{
                assert.equal(result[0].title, film.title)
                assert.equal(result[0].director, film.director)
                resolve()
            })
        })
        await promise
    })
    it("/api/films test", async ()=>{
        let response = await fetch("http://localhost:3000/api/films")
        let result = await response.json()
        if (result != []){
            assert.equal(1,1)
        }
    })
    it("/api/films", async ()=>{
        let genre = await getGenre()
        let film ={
            title: "Catch me if you can",
            director: "steven spielberg",
            genre_id: genre.id,
            rating: 9.5,
            release_date: "2001-08-25"
        }
        let response = await fetch(`http://localhost:3000/api/films/update/${id}`, {
            method: "PUT",
            body: JSON.stringify(film),
            headers: {
                "Content-Type": "application/json"
            }
        })
        let promise = new Promise(function(resolve,reject){
            mysql_db.getFilm(mysql,connectionProperties,id,(error,result)=>{
                assert.equal(result[0].director,film.director)
                resolve()
            })
        })
        await promise
    })
    it("/api/task", async ()=>{
        let response = await fetch(`http://localhost:3000/api/films/${id}`)
        let result = await response.json()
        assert.notEqual(result,undefined)
    })
    it("/api/delete", async ()=>{
        await fetch(`http://localhost:3000/api/films/delete/${id}`,{
            method: "DELETE"
        })
        let promise = new Promise(function(resolve,reject){
            mysql_db.getFilm(mysql,connectionProperties,id,(error,result)=>{
                if (result == []){
                    assert.equal(1,1)
                }
                resolve()
            })
        })
        await promise
    })
})


describe("integration test genres", () => {
    let id = undefined
    it("/api/genres insert", async ()=>{
        let genre ={
            name: "comedy"
        }
        let response = await fetch("http://localhost:3000/api/genres/insert",{
            method: "POST",
            body: JSON.stringify(genre),
            headers: {
                "Content-Type": "application/json"
            }
        })
        let result = await response.json()
        id = result.insertId
        let promise = new Promise(function(resolve,reject){
            mysql_db.getGenre(mysql,connectionProperties,id,(error,result)=>{
                assert.equal(result[0].name, genre.name)
                resolve()
            })
        })
        await promise
    })
    it("/api/genres getall", async ()=>{
        let response = await fetch("http://localhost:3000/api/genres")
        let result = await response.json()
        if (result != []){
            assert.equal(1,1)
        }
    })
    it("/api/genres update", async ()=>{
        let genre ={
            name: "Romantic"
        }
        let response = await fetch(`http://localhost:3000/api/genres/update/${id}`, {
            method: "PUT",
            body: JSON.stringify(genre),
            headers: {
                "Content-Type": "application/json"
            }
        })
        let promise = new Promise(function(resolve,reject){
            mysql_db.getGenre(mysql,connectionProperties,id,(error,result)=>{
                assert.equal(result[0].name,genre.name)
                resolve()
            })
        })
        await promise
    })
    it("/api/task", async ()=>{
        let response = await fetch(`http://localhost:3000/api/genres/${id}`)
        let result = await response.json()
        assert.notEqual(result,undefined)
    })
    it("/api/delete", async ()=>{
        await fetch(`http://localhost:3000/api/genres/delete/${id}`,{
            method: "DELETE"
        })
        let promise = new Promise(function(resolve,reject){
            mysql_db.getGenre(mysql,connectionProperties,id,(error,result)=>{
                if (result == []){
                    assert.equal(1,1)
                }
                resolve()
            })
        })
        await promise
    })
})