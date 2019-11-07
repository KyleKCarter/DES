require("dotenv").config();
const express = require('express');
const massive = require('massive');
const session = require('express-session');
const cookieSession = require('cookie-session');


//passport
const passport = require('passport');
const twitchStrategy = require('passport-twitch-new').Strategy;



const app = express();

const { SERVER_PORT, CONNECTION_STRING, SESSION_SECRET, SESSION_COOKIE_KEY, TWITCH_CLIENT_ID, TWITCH_CLIENT_SECRET, CALL_BACK_URL } = process.env;

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
        saveUninitialized: true,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 7,
            keys: [SESSION_COOKIE_KEY]
        }
    })
)

//middleware implementation
app.use(express.json());
app.use(checkForUser);
app.use(passport.initialize());
app.use(passport.session());

//Auth implementation
app.post('/auth/user/register', register);
app.post('/auth/user/login', login);
app.post('/auth/user/logout', logout);

//passport twitch strategy
passport.serializeUser((id, done) => {
    done(null, id);
});

passport.deserializeUser((obj, done) => {
    done(null, obj);
})

passport.use(
    new twitchStrategy({
        callbackURL: CALL_BACK_URL,
        clientID: TWITCH_CLIENT_ID,
        clientSecret: TWITCH_CLIENT_SECRET,
        scope: 'user_read'
    }, (accessToken, refreshToken, profile, done) => {
        console.log(accessToken);
        console.log(refreshToken);
        console.log(profile.id);
        console.log(done);


        done(null, profile);
    })
);

// function that adds the profile id to my media table in db
const addProfileId = (req, res) => {
    const twitch_profile_id = profile.id
    const {user_id} = req.session.user
    const db = req.app.get('db');
    const { twitch_profile_id } = req.body;
    db.add_profile(twitch_profile_id, user_id);
    req.session.user = {
        user_id: user_id,
        twitch_profile_id
    }
    res.status(200).json(profile);
}

//initializing passport
// router.use(passport.initialize());
// router.use(passport.session());

//checking and retrieving for if user already exists so that a new session/cookie will not be started
const authCheck = (req, res, next) => {
    if (!req.user) {
        return res.redirect('/auth/login');
    } else {
        return next();
    }
}

// router.get('/', authCheck, (req, res) => {
//     return res.send('profile', {user: req.user});
//     //return res.status(200).end();
// });

// //auth with twitch
// router.get('/twitch', passport.authenticate('twitch'));

function debug(req, res, next) {
    console.log("HIT");
    next()
}

//passport
app.get('/auth/twitch', passport.authenticate('twitch'));
app.get('/auth/twitch/callback', passport.authenticate('twitch', {
    forceVerify: true,
}), function (req, res) {
    res.redirect('http://localhost:3000/user/set-up');
});


app.listen(SERVER_PORT, () => console.log(`Running on PORT ${SERVER_PORT}.`));