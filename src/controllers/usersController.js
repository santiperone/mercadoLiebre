const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const { User, Product, Token, sequelize } = require("../data/models");
const { users } = require("../middlewares/webpSharp");

module.exports = {
    index(req,res) {

    },
    registerForm(req, res) {
        res.render('register');
    },
    async register(req, res) {
        try {
            const user = req.body;
            delete user.passwordcheck;
            user.admin = 0;
            user.password = await bcrypt.hash(user.password, 10);
            await User.create(user);
            res.redirect('/');
        } catch (error) {
            res.send(error);
        }
    },
    loginForm(req, res) {
        res.render('login', {error: '', old: {}});
    },
    async login(req, res) {
        try {
            let old = req.body;
            let error = {};
            let user = req.body.username.includes('@') 
                ? await User.findOne({where: {email: req.body.username}})
                : await User.findOne({where: {username: req.body.username}});
            if (user) {
                user = user.dataValues;
                if (!bcrypt.compareSync(req.body.password, user.password)) {
                    error.password = 'Revisá tu contraseña'
                    res.render('login', {old, error});
                } else {
                    req.session.user = user;
                    if (req.body.rememberme) {
                        const token = crypto.randomBytes(64).toString("base64");
                        res.cookie("userToken", token, {
                            maxAge: 1000 * 60 * 60 * 24 * 90,
                        });
                        await Token.create({token, userId: user.id});
                    }
                    res.redirect('/');
                } 
            } else {
                error.user = 'Revisá tu email o usuario'
                res.render('login', {old, error});
            }
            
        } catch (error) {
            res.send(error.message);
        }
    }
}