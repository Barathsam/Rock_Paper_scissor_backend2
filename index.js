const express = require('express');
const mysql = require("mysql2");
const app = express();
app.use(express.json())
require("dotenv").config()

const pool = mysql.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
})


app.post('/users', async function(req, res){
    try{
        const result = await pool.query('INSERT INTO users (name, status) VALUES (?,?)',[ req.body.name,req.body.status]);
        const rows = result[0];
        console.log(rows);
    }catch(err){
        console.error("Not Inserted",err);
    }
})

app.get('/users', async function(req, res){
    try{
        const result = await pool.query('SELECT * FROM users')
        const rows = result[0];
        res.send(rows);
    }catch(err){
        console.error("Cant read",err);
    }
})

app.listen(3002);


