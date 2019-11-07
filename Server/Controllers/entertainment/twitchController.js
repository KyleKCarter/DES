const getTwitchId = (req, res) => {
    const db = req.app.get('db');
    db.get_user_twitch_id().then(twitch_profile_id => {
        res.status(200).json(twitch_profile_id)
    }).catch(error => {
        console.log(error);
        res.status(500).json('Cannot process request.')
    })
}

module.exports = {
    getTwitchId
}