# Endpoints

## Film endpoints

### /api/films
type: GET
body: geen
Deze endpoint geeft alle films in de database terug
Voorbeeld response:
```
[
    {
        "id": 1,
        "title": "se7en",
        "director": "geen idee",
        "genre_id": 3,
        "rating": 10,
        "release_date": "1994-10-04T23:00:00.000Z"
    },
    {
        "id": 2,
        "title": "the immitation game",
        "director": "geen idee",
        "genre_id": 2,
        "rating": 10,
        "release_date": "2005-10-04T22:00:00.000Z"
    
]
```

### /api/films/:id
type: GET,
body: geen
deze endpoint geeft de film voor de meegegeven id terug
voorbeeld response:
```
{
        "id": 1,
        "title": "se7en",
        "director": "geen idee",
        "genre_id": 3,
        "rating": 10,
        "release_date": "1994-10-04T23:00:00.000Z"
},
```

### /api/films/genre/:id
type: GET,
body: geen
Deze endpoint geeft voor alle films voor een bepaald genre terug (het genre wordt bepaald door de id in de url)
voorbeeld response:
```
[
    {
        "id": 6,
        "title": "star wars: revenge of the sith",
        "director": "george lucas",
        "genre_id": 1,
        "rating": 9,
        "release_date": "2005-10-04T22:00:00.000Z"
    }
]
```

### /api/films/insert
type: POST,
body:
```
{
    "title": "Catch me if you can",
    "director": "geen idee",
    "genre_id": 1,
    "rating": 9.5,
    "release_date": "2001-08-20"
}
```
Deze endpoint insert de gegeven film in de database
genre_id is de id van het genre en kan opgevraagd worden met de endpoint /genres

### /api/films/update/:id
type: PUT
body: 
```
{
    "title": "Catch me if you can",
    "director": "Steven spielberg",
    "genre_id": 1,
    "rating": 10,
    "release_date": "2008-08-20"
}
```
Deze endpoint update de film waarvan de id uit de url overeenkomt met de film die meegegeven wordt in de body

### /api/films/delete/:id
type: DELETE,
body: geen
Deze endpoint verwijderd de film met de gegeven id uit de database

## Genres endpoints

### /api/genres
type: GET
body: geen
Deze endpoint geeft alle genres die in de database zitten terug
voorbeeld response:
```
[
    {
        "id": 1,
        "name": "sci-fi"
    },
    {
        "id": 2,
        "name": "action"
    },
    {
        "id": 3,
        "name": "horror"
    }
]
```

### /api/genres/:id
type: GET,
body: geen
Deze endpoint geeft het genre met de gegeven id terug
voorbeeld response:
```
{
    "id": 1,
    "name": "sci-fi"
},
```

### /api/genres/insert
type: POST,
body:
```
{
    "name": "Comedy"
}
```
Deze endpoint voegt de gegeven genre toe aan de database

### /api/genres/update/:id
type: PUT,
body: 
```
{
    "name": "Romantic"
}
```
Deze enpoint update het genre met de gegeven id met het genre in de body

### /api/genres/delete/:id
type: DELETE
body: geen
Deze endpoint verwijdert het genre met de gegeven id uit de database


