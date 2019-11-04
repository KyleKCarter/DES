require("dotenv").config();
const express = require('express');
const massive = require('massive');
const session = require('express-session');
const passport = require('passport');

const app = express();

//passport config
// require('./Passport/passport')(passport);

const {SERVER_PORT, CONNECTION_STRING, SESSION_SECRET} = process.env;

//controllers
const {register} = require('./Controllers/authentication/register_controller');
const {login} = require('./Controllers/authentication/login_controller');
const {logout} = require('./Controllers/authentication/logout_controller');

//middleware
const {checkForUser} = require('./Middleware/auth_middleware');

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

//passport middlewar
// app.use(passport.initialize());
// app.use(passport.session());

//middleware implementation
app.use(express.json());
app.use(checkForUser);

//Auth implementation
app.post('/auth/user/register', register);
app.post('/auth/user/login', login);
app.post('/auth/user/logout', logout);

app.listen(SERVER_PORT, () => console.log(`Running on PORT ${SERVER_PORT}.`));;