const getUserProfile = async(req, res) => {
    const db = req.app.get('db');
    const {id} = req.params;
    const getProfile = await db.get_userInfo(id)
        res.status(200).json(getProfile)
}

const getUserReviews = async(req, res) => {
    const db = req.app.get('db');
    const {id} = req.params;
    const getReviews = await db.get_userReviews(id)
        res.status(200).json(getReviews)
}

module.exports = {
    getUserProfile,
    getUserReviews
}