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
    seed: (req, res) =>{
        sequelize.query(`
        DROP TABLE IF EXISTS users_grocery_items;
        DROP TABLE IF EXISTS users;
        DROP TABLE IF EXISTS grocery_items;

        CREATE TABLE users (
            user_id SERIAL PRIMARY KEY,
            username VARCHAR(255),
            email VARCHAR(255),
            password VARCHAR(255)
        );

        CREATE TABLE grocery_items (
            grocery_items_id SERIAL PRIMARY KEY,
            item_name VARCHAR(255),
            item_catogary VARCHAR(255),
            item_price FLOAT(50),
            item_image VARCHAR(500),
            display boolean
        );

        CREATE TABLE users_grocery_items (
            user_grocery_items_id SERIAL PRIMARY KEY,
            user_id INTEGER REFERENCES users(user_id),
            grocery_items_id INTEGER REFERENCES grocery_items(grocery_items_id)
        );
        

        INSERT INTO users (username, email, password)
        VALUES ('Khaled Ahmed', 'khaled@gmail.com', 'xxxxxx'),
                ('Amran Ahmed', 'amran91@gmail.com', 'llllll'),
                ('John doe', 'johmDoe@gmail.com', 'hhhhhh'),
                ('Ola Khalil', 'olakhalil@gmail.com', 'oooooo');

        

        INSERT INTO grocery_items (item_name, item_catogary, item_price, item_image, display)
        VALUES ('Tomato', 'Vegetables', '2.99', 'https://images.albertsons-media.com/is/image/ABS/184570136?$ecom-pdp-desktop$&defaultImage=Not_Available&defaultImage=Not_Available', false),
               ('Cucumber', 'Vegetables', '1.99', 'https://cdn.shopify.com/s/files/1/0562/4205/products/bentley-seed-vegetable-seed-cucumber-marketmore-76-seed-781101231_fce3ecaa-607e-4844-9ad4-a27674b37063_grande.jpg?v=1626103349', false),
               ('milk', 'Dairy', '5.22', 'https://i5.walmartimages.com/asr/e7902a92-e10f-4a2a-8396-b1dd30316438.0c4283705821cf02c1bca800757f8139.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF', false),
               ('Bread', 'carbs', '2.39', 'https://i5.walmartimages.com/asr/77a88e63-2859-4f20-83b5-d4dfadc0cec9.6ed1f9c617509895c4d7a7308613a3b7.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF', false),
               ('Egg', 'Dairy', '7.95', 'https://m.media-amazon.com/images/I/61smImQWE3L._AC_SX679_.jpg', false),
               ('Steak', 'Meat', '5.99', 'https://embed.widencdn.net/img/beef/h0mmze6z9f/800x600px/Shoulder%20Steak.psd?keep=c&u=7fueml', false),
               ('chicken', 'Meat', '3.40', 'https://i2.wp.com/hygienicmeat.com/wp-content/uploads/2020/07/s735965455334319150_p6_i1_w2048.jpeg', false),
               ('carrot','Vegetables', '1.49', 'https://i.ndtvimg.com/mt/cooks/2014-11/carrots.jpg', false),
               ('coffee', 'drinks', '6.78', 'https://www.thespruceeats.com/thmb/PIYXCDznESSfMxgQIoPYi3mdw5w=/fit-in/1271x869/filters:no_upscale():max_bytes(150000):strip_icc()/FourSigmaFoodsMushroomInstantCoffee-33fa4ce565e242818122311ce6ba18f5.jpg', false),
               ('cheese', 'dairy', '2.99', 'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F43%2F2021%2F04%2F13%2FGettyImages-504780334-2000.jpg', false);

        `).then (()=>{
            console.log('DB seeded!')
            res.sendStatus(200)
        }).catch(err => console.log('error seeding DB', err))
    }
}