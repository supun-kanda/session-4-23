// core modules
const {readFileSync} = require('fs');

const
    dummyBooks = [
        { name: 'book1', genre: 'genre1', id: "1", authorId: "1" },
        { name: 'book2', genre: 'genre2', id: "2", authorId: "2" },
        { name: 'book3', genre: 'genre3', id: "3", authorId: "3" },
        { name: 'book4', genre: 'genre3', id: "4", authorId: "2" },
        { name: 'book5', genre: 'genre2', id: "5", authorId: "3" },
        { name: 'book6', genre: 'genre3', id: "6", authorId: "3" }
    ],
    dummyAuthors = [
        { name: 'author1', age: 20, id: "1" },
        { name: 'author2', age: 30, id: "2" },
        { name: 'author3', age: 40, id: "3" }
    ],
    dbName = 'restaurants',
    externalSourceFile = './conts.json'
    readFileSync('')

module.exports = {
    dummyBooks,
    dummyAuthors,
    mongoDbPassword
}