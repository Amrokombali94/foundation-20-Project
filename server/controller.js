require('dotenv').config()

const { CONNECTION_STRING } = process.env

const Sequelize = require('sequelize')

const sequelize = new Sequelize(CONNECTION_STRING,{
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false
        }
    }
})



module.exports = {
    getAllItems: (req, res) => {
        sequelize.query(`
            SELECT * FROM grocery_items;
        `)
        .then(dbRes => res.status(200).send(dbRes[0]))
        .catch(err => console.log(err))

       
    },
    getAllCartItems: (req, res) => {
        sequelize.query(`
            SELECT * FROM grocery_items WHERE display = 'true';
        `)
        .then(dbRes => res.status(200).send(dbRes[0]))
        .catch(err => console.log(err))
    },

    addToCart: (req, res) => {
        // get the items id from the req.body
        let {grocery_items_id} = req.params
        // Turn the SELECT statement below into an UPDATE statement that locates the specific item by its ID, then changes "display" to true
        sequelize.query(`
            UPDATE grocery_items SET display = true WHERE grocery_items_id = ${grocery_items_id}
        `)
        .then(dbRes => res.status(200).send(dbRes[0]))
        .catch(err => console.log(err))
    },
    
    removeFromCart: (req, res) => {
        let {grocery_items_id} = req.params
        // Turn the SELECT statement below into an UPDATE statement that locates the specific item by its ID, then changes "display" to false
        sequelize.query(`
            UPDATE grocery_items SET display = false WHERE grocery_items_id = ${grocery_items_id};
            SELECT * FROM grocery_items WHERE display = 'true';
        `)
        .then(dbRes => res.status(200).send(dbRes[0]))
        .catch(err => console.log(err))
    }
}

// Steps: 
//              SET UP YOUR DB
// Update your db to include the "display" column
// Update db to only have 1 table ("groceries")

//   SET UP SERVER/ USE POSTMAN TO TEST THESE FUNCTIONALITIES
// Be able to get all groceries (you can already do this!)
// Be able to get just the groceries where display = true
// Be able to change any item's "display " property to true
// Be able to change any item's "display " property to false

//               SET UP YOU CLIENT/ FRONT END
// Set up your front end to be able to do all of these functions
// Set up your front end to be able to display items appropriately