require("dotenv").config();
const express = require('express');
const massive = require('massive');
const session = require('express-session');
const cookieSession = require('cookie-session');
const passport = require('passport');
const passportSetup = require('./Passport/passport-setup');
const authRoutes = require('./server-routing/auth-routes');
const accoutSetupRoutes = require('./server-routing/accout-setup-routes');


const app = express();

const { SERVER_PORT, CONNECTION_STRING, SESSION_SECRET, SESSION_COOKIE_KEY } = process.env;

//controllers
const { register } = require('./Controllers/authentication/register_controller');
const { login } = require('./Controllers/authentication/login_controller');
const { logout } = require('./Controllers/authentication/logout_controller');

//middleware
const { checkForUser } = require('./Middleware/auth_middleware');

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
app.use(checkForUser);

//cookie
app.use(cookieSession({
    maxAge: 1000 * 60 * 60 * 24 * 7,
    keys: [SESSION_COOKIE_KEY]
}));

//Auth implementation
app.post('/auth/user/register', register);
app.post('/auth/user/login', login);
app.post('/auth/user/logout', logout);

//initialize passport
app.use(passport.initialize());
app.use(passport.session());

//set up routes
app.use('/auth', authRoutes);
app.use('/user/set-up', accoutSetupRoutes);

app.listen(SERVER_PORT, () => console.log(`Running on PORT ${SERVER_PORT}.`));