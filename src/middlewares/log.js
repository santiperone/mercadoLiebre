// ******** Sequelize ***********

const { User, Token } = require('../data/models');

module.exports = async (req, res, next) => {
    res.locals.user = false;
    try {
        if (req.session.user) {
            res.locals.user = req.session.user;
            return next();
        } else if (req.cookies.userToken) {
            let token = await Token.findOne({where: {token: req.cookies.userToken}});
            let user = await User.findByPk(token.userId);
            delete user.password;
            req.session.user = user;
            res.locals.user = user;
            return next();
        } else {
            return next();
        }
    } catch (error) {
        console.log(error);
    }
}
