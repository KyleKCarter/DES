const bcrypt = require('bcryptjs');

const register = async (req, res) => {
    const db = req.app.get('db');
    const {firstname, lastname, email, username, password} = req.body;

    const checkedUser = await db.get_user([username]);
    if (checkedUser.length === 0) {
        const salt = bcrypt.genSaltSync(12);
        const hashedPassword = bcrypt.hashSync(password, salt);
        const user = await db.register_user([firstname, lastname, email, username, hashedPassword]);
        req.session.user = {
            id: user[0].id,
            username,
            firstname,
            lastname
        }
        res.status(200).json(user);
    } else {
        res.status(409).json({error: "Username taken, please try another."});
    }
}

module.exports = {
    register
}