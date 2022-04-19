//all packages and files to be imported
require('dotenv').config()
const express = require('express')
const cors = require('cors')
const {SERVER_PORT} = process.env
const app = express()
const path = require('path')

app.use(express.json())
app.use(cors())

app.use(express.static('clients'))



const {seed} = require('./seed.js')

const {getAllItems, getAllCartItems, addToCart, removeFromCart} = require('./controller')
const res = require('express/lib/response')

app.get('/', (req, res) =>{
    res.sendFile(path.join(__dirname,'../clients/home.html'))
})

app.post('/seed', seed)

app.get('/cart', getAllCartItems)


app.put('/cart/:grocery_items_id', removeFromCart)

app.put('/items/:grocery_items_id', addToCart)
app.get('/items', getAllItems)





 const port = process.env.PORT || SERVER_PORT

app.listen(port,() => console.log(`Server running on ${port}`))