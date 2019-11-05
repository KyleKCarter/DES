const router = require('express').Router();
const passport = require('passport');

//auth with twitch
router.get('/twitch', passport.authenticate('twitch', {
    scope: ['profile']
}));

//callback route for twitch to redirect to
router.get('/twitch/redirect', passport.authenticate('twitch'), (req, res) => {
    res.redirect('/user/set-up');
})

module.exports = router;