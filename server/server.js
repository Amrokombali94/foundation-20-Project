//all packages and files to be imported
require('dotenv').config()
const express = require('express')
const cors = require('cors')
const {SERVER_PORT} = process.env
const app = express()

app.use(express.json())
app.use(cors())


const {seed} = require('./seed.js')

const {getAllItems, getAllCartItems, addToCart, removeFromCart} = require('./controller')

app.post('/seed', seed)

app.get('/cart', getAllCartItems)


app.put('/cart/:grocery_items_id', removeFromCart)

app.put('/items/:grocery_items_id', addToCart)
app.get('/items', getAllItems)





 const port = process.env.PORT || SERVER_PORT

app.listen(port,() => console.log(`Server running on ${port}`))