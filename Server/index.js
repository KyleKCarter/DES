require("dotenv").config();
const express = require('express');
const massive = require('massive');
const session = require('express-session');

const app = express();

const {SERVER_PORT, CONNECTION_STRING, SESSION_SECRET} = process.env;

//controllers

//middleware

//massive
massive(CONNECTION_STRING)
    .then(db => {
        app.set('db', db);
        console.log("Database Connected");
    })
.catch(error => console.log(error));

app.use(
    session({
        secret: SESSION_SECRET,
        resave: false,
        saveUninitialized: true
    })
)

//middleware implementation
app.use(express.json());

app.listen(SERVER_PORT, () => console.log(`Running on PORT ${SERVER_PORT}.`));;