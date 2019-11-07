const getTwitchId = (req, res) => {
    const db = req.app.get('db');
    const {id} = req.session.user
    db.get_user_twitch_id(id).then(response => {
        res.status(200).json(response)
    }).catch(error => {
        console.log(error);
        res.status(500).json('Cannot process request.')
    })
}

module.exports = {
    getTwitchId
}