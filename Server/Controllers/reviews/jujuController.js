// const increaseJuJu = async(req, res) => {
//     const db = req.app.get('db');
//     const {review_id, good_juju} = req.body;
//     const addGoodJuJu = await db.increase_juju([review_id, good_juju])
//     res.status(200).json(addGoodJuJu)
// }

// const decreaseJuJu = async(req, res) => {
//     const db = req.app.get('db');
//     const {review_id, bad_juju} = req.body;
//     const addBadJuJu = await db.decrease_juju([review_id, bad_juju])
//     res.status(200).json(addBadJuJu)
// }

// const getJuJu = async(req, res) => {
//     const db = req.app.get('db');
//     const {review_id} = req.body;
//     const juju = await db.get_juju([review_id])
//     res.status(200).json(juju)
// }

const goodJuJu = async(req, res, next) => {
    const db = req.app.get('db');
    const {review_id, user_id, juju} = req.body;

    const checkJuJu = await db.check_juju([review_id, user_id]);
    if(checkJuJu.length === 0) {
        const increaseJuJu = await db.increase_juju([review_id, user_id, juju]);
        res.status(200).json(increaseJuJu);
    } else {
        res.status(409).json({error: "You've already given this post too much good JuJu."})
    }
}

const badJuJu = async(req, res, next) => {
    const db = req.app.get('db');
    const {review_id, user_id, juju} = req.body;

    const checkJuJu = await db.check_juju([review_id, user_id]);
    if(checkJuJu.length === 0) {
        const decreaseJuJu = await db.decrease_juju([review_id, user_id, juju]);
        res.status(200).json(decreaseJuJu);
    } else {
        res.status(409).json({error: "You've already given this post too much bad JuJu, even if they might deserve it."})
    }
}

const getJuJu = async(req, res, next) => {
    const db = req.app.get('db');

}

module.exports = {
    // increaseJuJu,
    // decreaseJuJu,
    // getJuJu
    goodJuJu,
    badJuJu
}