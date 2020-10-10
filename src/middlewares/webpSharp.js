const sharp = require('sharp');
const path = require('path')

// .resize({width: 640, height: 640})
const webp = async (req, res, next) => {
    if (typeof req.file === 'undefined') {
        next()
    } else {
        fileName = 'img-' + Date.now() + '.webp'
        fileDir = path.join(__dirname, '../../public/img/products', fileName);
        await sharp(req.file.buffer).webp().toFile(fileDir);
        req.body.image = fileName;
        next();
    }
}
module.exports = webp;