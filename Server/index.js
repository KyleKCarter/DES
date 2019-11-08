require("dotenv").config();
const express = require('express');
const massive = require('massive');
const session = require('express-session');


//passport
const passport = require('passport');
const twitchStrategy = require('passport-twitch-new').Strategy;
const mixerStrategy = require('passport-mixer').Strategy;



const app = express();

const { SERVER_PORT, CONNECTION_STRING, SESSION_SECRET, SESSION_COOKIE_KEY, TWITCH_CLIENT_ID, TWITCH_CLIENT_SECRET, TWITCH_CALL_BACK_URL, MIXER_CLIENT_ID, MIXER_CLIENT_SECRET, MIXER_CALL_BACK_URL } = process.env;

//controllers
const { register } = require('./Controllers/authentication/register_controller');
const { login } = require('./Controllers/authentication/login_controller');
const { logout } = require('./Controllers/authentication/logout_controller');
const { getTwitchId } = require('./Controllers/entertainment/twitchController');
const { getMixerId } = require('./Controllers/entertainment/mixerController');

//middleware
const { checkForUser } = require('./Middleware/auth_middleware');
//massive
massive(CONNECTION_STRING)
    .then(db => {
        app.set('db', db);
        dbInstance = db;
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

//passport serialization
passport.serializeUser((id, done) => {
    done(null, id);
});

passport.deserializeUser((obj, done) => {
    done(null, obj);
})

//passport twitch strategy
let twitchProfile = null;
passport.use(
    new twitchStrategy({
        callbackURL: TWITCH_CALL_BACK_URL,
        clientID: TWITCH_CLIENT_ID,
        clientSecret: TWITCH_CLIENT_SECRET,
        scope: 'user_read'
    }, (accessToken, refreshToken, profile, done) => {

        twitchProfile = profile;
        done(null, profile);
    })
);

// function that adds the profile id to my media table in db
const addTwitchProfileId = (req, res) => {
    console.log(req.session)
    const twitch_profile_id = twitchProfile.id;
    const {id} = req.session.user;
    const db = req.app.get('db');
    db.add_twitchProfile(id, twitch_profile_id);
    req.session.user = {
        id: id,
        twitch_profile_id
    }
    res.status(200).json(userProfile);
}

//passport mixer strategy
let mixerProfile = null
passport.use(
    new mixerStrategy ({
        clientID: MIXER_CLIENT_ID,
        clientSecret: MIXER_CLIENT_SECRET,
        callbackURL: MIXER_CALL_BACK_URL
    }, (accessToken, refreshToken, profile, done) => {

        mixerProfile = profile;
        done(null, profile);
    })
)

const addMixerProfileId = (req, res) => {
    console.log(req.session)
    const mixer_profile_id = mixerProfile.id;
    const {id} = req.session.user;
    const db = req.app.get('db');
    db.add_mixerProfile(id, mixer_profile_id);
    req.session.user = {
        id: id,
        mixer_profile_id
    }
    res.status(200).json(userProfile);
}

//debug function
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
app.get('/auth/mixer', passport.authenticate('mixer'));
app.get('/auth/mixer/callback', passport.authenticate('mixer', {
    forceVerify: true,
}), (req, res) => {
    res.redirect('http://localhost:3000/user/set-up');
})

//twitch http requests
app.post('/api/twitch_profile_id', addTwitchProfileId);
app.get('/api/twitch_profile_id', getTwitchId);

//mixer http requests
app.post('/api/mixer_profile_id', addMixerProfileId);
app.get('/api/mixer_profile_id', getMixerId);


app.listen(SERVER_PORT, () => console.log(`Running on PORT ${SERVER_PORT}.`));