import express from 'express'
import { books, users } from './data.js'

const app = express()
const port = 3000
app.use(express.json())

app.get('/', (req, res) => {
    res.send('Welcome to the API Library')  
})

//get
app.get('/books', (req, res) => {
    res.send(books)
})

app.get('/books/:id',(req, res) => {

    //merubah tipe data menjadi integer menggunakan parseInt
    const id = parseInt(req.params.id)
    //mencari buku dengan Id yang sesuai
    const book = books.find((book) => book.id === id)
    //jika id buku tidak ditemukan
    if (!book) {
        res.send(`Book with ID: ${id} not found !`)
    }

    res.send(book)
})

// POST
app.post('/books', (req, res) => {
    
    const {title, author, year } = req.body

    const newId = books.length + 1

    const newBook = { id: newId, title, author, year}

    books.push(newBook)

    res.send('Book created successfully')
 })
  
// PUT
app.put('/books/:id', (req, res) => {
    const id = parseInt(req.params.id)

    const {title, author, year } = req.body

    const bookIndex = books.findIndex((book) => book.id === id)
    
    if (bookIndex === -1) {
        res.send(`Book with ID: ${id} not found`)
        return
      }

    books[bookIndex] = {
        id: books[bookIndex].id,
        title,
        author,
        year,
    }

    res.send(`Book with ID: ${id} updated successfully`)
})
  
// DELETE
app.delete('/books/:id', (req, res) => {
    const id = parseInt(req.params.id)

    const bookIndex = books.findIndex((book) => book.id === id)

    if (bookIndex === -1) {
        res.send(`Book with ID: ${id} not found`)
        return
      }

    books.splice(bookIndex, 1)
    
    res.send(`Book with ID: ${id} deleted successfully`)
})

//get user
app.get('/users', (req, res) => {
    res.send(users)
})

app.get('/users/:id',(req, res) => {

    //merubah tipe data menjadi integer menggunakan parseInt
    const id = parseInt(req.params.id)
    //mencari user dengan Id yang sesuai
    const user = users.find((user) => user.id === id)
    //jika id user tidak ditemukan
    if (!user) {
        res.send(`User with ID: ${id} not found !`)
    }

    res.send(user)
})

// POST User
app.post('/users', (req, res) => {
    
    const {name, email, role } = req.body

    const newId = users.length + 1

    const newUser = { id: newId, name, email, role}

    users.push(newUser)

    res.send('User created successfully')
 })
  
// PUT User
app.put('/users/:id', (req, res) => {
    const id = parseInt(req.params.id)

    const {name, email, role } = req.body

    const userIndex = users.findIndex((user) => user.id === id)
    
    if (userIndex === -1) {
        res.send(`User with ID: ${id} not found`)
        return
      }

      users[userIndex] = {
        id: users[userIndex].id,
        name,
        email,
        role,
    }

    res.send(`User with ID: ${id} updated successfully`)
})
  
// DELETE User
app.delete('/users/:id', (req, res) => {
    const id = parseInt(req.params.id)

    const userIndex = users.findIndex((user) => user.id === id)

    if (userIndex === -1) {
        res.send(`User with ID: ${id} not found`)
        return
      }

      users.splice(userIndex, 1)
    
    res.send(`User with ID: ${id} deleted successfully`)
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)  
})