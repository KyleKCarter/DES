const getYoutubeId = (req, res) => {
    const db = req.app.get('db');
    const {id} = req.session.user
    db.get_youtube_id(id).then(reqponse => {
        res.status(200).json(response)
    }).catch(error => {
        console.log(error)
        res.status(500).json('Cannot process request.')
    })
}

module.exports = {
    getYoutubeId
}