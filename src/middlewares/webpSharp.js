const sharp = require('sharp');
const path = require('path');
const usersController = require('../controllers/usersController');

module.exports = {
    async products(req, res, next) {
        if (typeof req.file === 'undefined') {
            next()
        } else {
            fileName = 'img-' + Date.now() + '.webp'
            fileDir = path.join(__dirname, '../../public/img/products', fileName);
            await sharp(req.file.buffer).webp().toFile(fileDir);
            req.body.image = fileName;
            next();
        }
    },
    async users(req, res, next) {
        if (typeof req.file === 'undefined') {
            next()
        } else {
            fileName = 'img-' + Date.now() + '.webp'
            fileDir = path.join(__dirname, '../../public/img/users', fileName);
            await sharp(req.file.buffer).webp().toFile(fileDir);
            req.body.image = fileName;
            next();
        }
    }
}