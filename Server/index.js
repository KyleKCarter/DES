require("dotenv").config();
const express = require('express');
const massive = require('massive');
const session = require('express-session');


//passport
const passport = require('passport');
const twitchStrategy = require('passport-twitch-new').Strategy;
const mixerStrategy = require('passport-mixer').Strategy;
const youtubeStrategy = require('passport-youtube-v3').Strategy;

//nodemailer
const nodemailer = require('nodemailer');
const creds = require('../config');

const app = express();

const {
    SERVER_PORT,
    CONNECTION_STRING,
    SESSION_SECRET,
    SESSION_COOKIE_KEY,
    TWITCH_CLIENT_ID,
    TWITCH_CLIENT_SECRET,
    TWITCH_CALL_BACK_URL,
    MIXER_CLIENT_ID,
    MIXER_CLIENT_SECRET,
    MIXER_CALL_BACK_URL,
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    GOOGLE_CALL_BACK_URL
} = process.env;

//controllers
const { register } = require('./Controllers/authentication/register_controller');
const { login } = require('./Controllers/authentication/login_controller');
const { logout } = require('./Controllers/authentication/logout_controller');
const { getTwitchId } = require('./Controllers/entertainment/twitchController');
const { getMixerId } = require('./Controllers/entertainment/mixerController');
const { getYoutubeId } = require('./Controllers/entertainment/youtubeController');
const { addReview, getReviews, editUserReview, deleteUserReview } = require('./Controllers/reviews/reviewsController');
const { updateImg, updateProfile, getUserImg, removeTwitch, removeMixer, removeYoutube } = require('./Controllers/profile/profileSettingsController');
const { getUserProfile, getUserReviews } = require('./Controllers/profile/profileController');
// const { increaseJuJu, decreaseJuJu, getJuJu} = require('./Controllers/reviews/jujuController');

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
app.use((request, response, next) => {
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Headers", "Content-Type");
    next();
});

//Auth implementation
app.post('/auth/user/register', register);
app.post('/auth/user/login', login);
app.post('/auth/user/logout', logout);
app.get("/auth/user", function(req, res) {
    if(req.session.user) {
        res.status(200).json({user: req.session.user, isLoggedIn: true});
    } else {
        res.status(410).json({isLoggedIn: false});
    }
})

//nodemailer implementation

// const transport = {
//     host: 'smtp.gmail.com',
//     auth: {
//         user: creds.USER,
//         pass: creds.PASS
//     }
// }

// const transporter = nodemailer.createTransport(transport)

// transporter.verify((error, success) => {
//     if (error) {
//         console.log(error);
//     } else {
//         console.log('Server is ready to take messages');
//     }
// });

// app.post('/send', (req, res, next) => {
//     const name = req.body.name
//     const email = req.body.email
//     const message = req.body.message
//     const content = `name: ${name} \n email: ${email} \n message: ${message}`

//     const mail = {
//         from: name,
//         to: 'RECEIVING_EMAIL_ADDRESS_GOES_HERE', //Change to email address that you want to receive messages on
//         subject: 'Welcome to the team!',
//         text: content
//     }

// transport.sendMail(mail, (error, data) => {
//     if(error) {
//         res.json({
//             msg: 'fail'
//         })
//     } else {
//         res.json({
//             msg: 'success'
//         })
//     }
// })
// })

app.post('/send', (req, res) => {
    //create reusable transporter object using the default SMTP transport
    const { name, email } = req.body
    // const message = req.body.message

    let transporter = nodemailer.createTransport({
        service: "gmail",
        host: 'smtp.gmail.com',
        port: 587,
        auth: {
            user: creds.USER,
            pass: creds.PASS
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    //setup email data with unicode symbols
    let mailOptions = {
        from: creds.USER, //sender address
        to: email, //list of receivers
        subject: 'Welcome to the team!',
        text: `Hi ${name}, we at DESK would like to welcome you to the team!`
    };

    //send mail with defined transport object
    transporter.sendMail(mailOptions, (error, data) => {
        console.log(mailOptions)
        if (error) {
            console.log('Error Occurs')
        } else {
            console.log('Email sent!')
        }
    });
});

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
    // console.log(req.session)
    const twitch_profile_id = twitchProfile.id;
    const { id } = req.session.user;
    const db = req.app.get('db');
    db.add_twitchProfile(id, twitch_profile_id);
    req.session.user = {
        id: id,
        twitch_profile_id
    }
    res.status(200).json(twitchProfile);
}

//passport mixer strategy
let mixerProfile = null
passport.use(
    new mixerStrategy({
        clientID: MIXER_CLIENT_ID,
        clientSecret: MIXER_CLIENT_SECRET,
        callbackURL: MIXER_CALL_BACK_URL
    }, (accessToken, refreshToken, profile, done) => {

        mixerProfile = profile;
        done(null, profile);
    })
)

const addMixerProfileId = (req, res) => {
    // console.log(req.session)
    const mixer_profile_id = mixerProfile.id;
    const { id } = req.session.user;
    const db = req.app.get('db');
    db.add_mixerProfile(id, mixer_profile_id);
    req.session.user = {
        id: id,
        mixer_profile_id
    }
    res.status(200).json(mixerProfile);
}

//passport youtube strategy
let youtubeProfile = null
passport.use(
    new youtubeStrategy({
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: GOOGLE_CALL_BACK_URL
    }, (accessToken, refreshToken, profile, done) => {

        youtubeProfile = profile
        done(null, profile);
    })
)

const addYouTubeProfileId = (req, res) => {
    const youtube_profile_id = youtubeProfile.id
    const { id } = req.session.user;
    const db = req.app.get('db');
    db.add_youtubeProfile(id, youtube_profile_id);
    req.session.user = {
        id: id,
        youtube_profile_id
    }
    res.status(200).json(youtubeProfile)
}

//debug function
function debug(req, res, next) {
    console.log("HIT");
    next()
}

//passport
app.get('/auth/twitch/set-up', passport.authenticate('twitch'));
app.get('/auth/twitch/callback/set-up', passport.authenticate('twitch', {
    forceVerify: true
}), function (req, res) {
    res.redirect('http://localhost:3000/user/set-up');
});

app.get('/auth/mixer/', passport.authenticate('mixer'));
app.get('/auth/mixer/callback', passport.authenticate('mixer', {
    forceVerify: true,
}), (req, res) => {
    res.redirect('http://localhost:3000/user/set-up');
})

app.get('/auth/youtube/', passport.authenticate('youtube', { scope: ['profile', 'https://www.googleapis.com/auth/youtube'] }));
app.get('/auth/youtube/callback', passport.authenticate('youtube', {
    forceVerify: true,
}), function (req, res) {
    res.redirect('http://localhost:3000/user/set-up');
})

//twitch http requests
app.post('/api/twitch_profile_id', addTwitchProfileId);
app.get('/api/twitch_profile_id', getTwitchId);

//mixer http requests
app.post('/api/mixer_profile_id', addMixerProfileId);
app.get('/api/mixer_profile_id', getMixerId);

//youtube http requests
app.post('/api/youtube_profile_id', addYouTubeProfileId);
app.get('/api/youtube_profile_id', getYoutubeId);

//reviews http requests
app.post('/api/review/post', addReview);
app.get('/api/reviews/:entertainment', getReviews);
app.put('/api/review/edit/:reviewId', editUserReview);
app.delete('/api/review/delete/:id', deleteUserReview);

//juju http requests
// app.post('/api/review/entertainment/post/good_juju', increaseJuJu);
// app.post('/api/review/entertainment/post/bad_juju', decreaseJuJu);
// app.get('/api/review/entertainment/post/juju', getJuJu);

//profile http requests
app.put('/api/user/profile/settings/image/:id', updateImg);
app.put('/api/user/profile/settings/:id', updateProfile);
app.get('/api/user/profile/image/:id', getUserImg);
app.get('/api/user/profile/:id', getUserProfile);
app.get('/api/user/profile/reviews/:id', getUserReviews);
app.put('/api/user/profile/settings/twitch/:id', removeTwitch);
app.put('/api/user/profile/settings/mixer/:id', removeMixer);
app.put('/api/user/profile/settings/youtube/:id', removeYoutube);

app.listen(SERVER_PORT, () => console.log(`Running on PORT ${SERVER_PORT}.`));