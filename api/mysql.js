function createConnection(mysql,connectionProperties){
    var connection = mysql.createConnection(connectionProperties)
    connection.connect()
    return connection
}

function getAllFilms(mysql,connectionProperties, callback){
    let connection = createConnection(mysql,connectionProperties)
    connection.query("select * from films", callback)
    connection.end()
}

function getFilm(mysql, connectionProperties, id, callback){
    let connection = createConnection(mysql,connectionProperties)
    connection.query("select * from films where id = ?", [id], callback)
    connection.end()
}

function getAllFilmsByGenre(mysql, connectionProperties,genre_id, callback){
    let connection = createConnection(mysql,connectionProperties)
    connection.query("select * from films where genre_id = ?", [genre_id],callback)
    connection.end()
}

function insertFilm(mysql,connectionProperties,film,callback){
    let connection = createConnection(mysql,connectionProperties)
    connection.query("insert into films set ?",film,callback)
    connection.end()
}

function updateFilm(mysql,connectionProperties,film,id,callback){
    let connection = createConnection(mysql,connectionProperties)
    connection.query("update films set title = ?, director = ?, genre_id = ?, rating= ?, release_date = ? where id = ?",
    [film.title, film.director, film.genre_id, film.rating, film.release_date, id],callback)
    connection.end()
}

function deleteFilm(mysql,connectionProperties,id,callback){
    let connection = createConnection(mysql,connectionProperties)
    connection.query("delete from films where id = ?",[id],callback)
    connection.end()
}

function getAllGenres(mysql,connectionProperties, callback){
    let connection = createConnection(mysql,connectionProperties)
    connection.query("select * from genre", callback)
    connection.end()
}

function getGenre(mysql, connectionProperties, id, callback){
    let connection = createConnection(mysql,connectionProperties)
    connection.query("select * from genre where id = ?", [id], callback)
    connection.end()
}

function insertGenre(mysql,connectionProperties,genre,callback){
    let connection = createConnection(mysql,connectionProperties)
    connection.query("insert into genre set ?",genre,callback)
    connection.end()
}

function updateGenre(mysql,connectionProperties,genre,id,callback){
    let connection = createConnection(mysql,connectionProperties)
    connection.query("update genre set name = ? where id = ?",
    [genre.name, id],callback)
    connection.end()
}

function deleteGenre(mysql,connectionProperties,id,callback){
    let connection = createConnection(mysql,connectionProperties)
    connection.query("delete from genre where id = ?",[id],callback)
    connection.end()
}



export{
    getAllFilms,
    getFilm,
    getAllFilmsByGenre,
    insertFilm,
    updateFilm,
    deleteFilm,
    getAllGenres,
    getGenre,
    insertGenre,
    updateGenre,
    deleteGenre
}