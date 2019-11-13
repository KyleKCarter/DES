const getGoogleId = (req, res) => {
    const db = req.app.get('db');
    const {id} = req.session.user
    db.get_google_id(id).then(response => {
        res.status(200).json(response)
    }).catch(error => {
        console.log(error)
        res.status(500).json('Cannot process request.')
    })
}

const addYouTubeProfileId = (req, res) => {
    const db = req.app.get('db');
    const {id} = req.session.user;
    const {youtube_profile_id} = req.body;
    db.add_youtubeProfile(id, youtube_profile_id)
    req.session.user = {
        id: id,
        youtube_profile_id
    }
    res.status(200).json(youtube_profile_id)
    // .then(response => {
    //     res.status(200).json(response)
    // }).catch(error => {
    //     console.log(error)
    //     res.status(500).json('Cannot process request.')
    // })
}

module.exports = {
    getGoogleId,
    addYouTubeProfileId
}