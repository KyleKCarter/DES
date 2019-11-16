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
    const {id} = req.params;
    const getImg = await db.get_userImg(id)
        res.status(200).json(getImg)
}

const removeTwitch = async(req, res) => {
    const db = req.app.get('db');
    const {id} = req.params;
    const {twitch_profile_id} = req.body;
    const removedTwitchProfile = await db.delete_twitchId(id, twitch_profile_id)
        res.status(200).json(removedTwitchProfile)
}

const removeMixer = async(req, res) => {
    const db = req.app.get('db');
    const {id} = req.params;
    const {mixer_profile_id} = req.body;
    const removedMixerProfile = await db.delete_mixerId(id, mixer_profile_id)
        res.status(200).json(removedMixerProfile)
}

const removeYoutube = async(req, res) => {
    const db = req.app.get('db');
    const {id} = req.params;
    const {youtube_profile_id} = req.body;
    const removedYoutubeProfile = await db.delete_youtubeId(id, youtube_profile_id)
        res.status(200).json(removedYoutubeProfile)
}

module.exports = {
    updateImg,
    updateProfile,
    getUserImg,
    removeTwitch,
    removeMixer,
    removeYoutube
}