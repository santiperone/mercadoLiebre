const {Product} = require('../data/models');

module.exports = async(req, res, next) => {
    try {
        let product = await Product.findByPk(req.params.id);
        if(product){
            if(req.session.user.id != product.userId){
               return res.redirect('/');
            }
            return next();
         }
         return next();
    } catch (error) {
        console.log(error);
    }
}