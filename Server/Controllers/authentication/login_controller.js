const bcrypt = require('bcryptjs');

const login = async(req, res) => {
    const db = req.app.get('db');
    const {username, password} = req.body;
    const checkedUser = await db.get_user([username]);
    if(checkedUser.length === 0) {
        res.status(401).json({error: "Wrong username or password"})
    }
    const isMatching = await bcrypt.compare(password, checkedUser[0].password)
    if(isMatching) {
        req.session.user = {
            id: checkedUser[0].id,
            username: checkedUser[0].username,
            firstname: checkedUser[0].firsname,
            lastname: checkedUser[0].lastname
        }
        return res.json(req.session.user)
    } else {
        return res.status(403).json({error: "Wrong username or password"})
    }
}

module.exports = {
    login
}