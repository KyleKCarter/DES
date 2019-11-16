const updateImg = async(req, res) => {
    const db = req.app.get('db');
    const {id} = req.params;
    const {img} = req.body;
    const updatedImg = await db.update_userImg(id, img)
        res.status(200).json(updatedImg);
}

const updateProfile = async(req, res) => {
    const db = req.app.get('db');
    const {id} = req.params;
    const { username, bio} = req.body;
    const updatedUser = await db.update_userProfile(id, username, bio)
        res.status(200).json(updatedUser);
}

const getUserImg = async(req, res) => {
    const db = req.app.get('db');
    const {id} = req.params
    const getImg = await db.get_userImg(id)
        res.status(200).json(getImg)
}

module.exports = {
    updateImg,
    updateProfile,
    getUserImg
}