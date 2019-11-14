const addReview = (req, res) => {
    const db = req.app.get('db');
    const {entertainment_service, review_title, username, review_text} = req.body;
    const {id} = req.session.user;

    db.add_reviewPost(id, entertainment_service, review_title, username, review_text)
        .then(response => {
            res.status(200).json(response)
        }).catch(error => {
            console.log(error)
            res.status(500).json('Cannot process request.')
        })
}

const getReviews = (req, res) => {
    const db = req.app.get('db');
    const {entertainment} = req.params;
    db.get_reviews([entertainment]).then(response => {
        res.status(200).json(response)
    }).catch(error => {
        console.log(error)
        res.status(500).json('Cannot process request.')
    })
}

module.exports = {
    addReview,
    getReviews
}