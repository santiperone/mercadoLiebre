const fs = require('fs');
const path = require('path');
const {Product, Category} = require('../data/models')

function toThousand(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};
function productPrice(prod) {
    prod.pricewd = Math.round(prod.price * (1 - prod.discount / 100));
    prod.price = toThousand(prod.price);            
    prod.pricewd = toThousand(prod.pricewd);     
    return prod;
}
function productsPrice(products) {
    products.forEach(prod => productPrice(prod));
    return products;
}


module.exports = {
    all: async function(req, res, next) {
        try {
            let products = await Product.findAll();
            products = productsPrice(products);
            res.render('products', { products });
        } catch (error) {
            res.send(error.message);
        }
        
    },
    detail: async function (req, res) {
        try {
            let product = await Product.findByPk(req.params.id);
            product = productPrice(product);
            console.log(product);
            res.render('product-detail', { product });
        } catch (error) {
            res.send(error.message);
        }
    },
    createForm: async function (req, res) {
        try {
            const categories = await Category.findAll();
            res.render('createProduct', {categories});
        } catch (error) {
            
        }
    },
    create: async function(req, res) {
        try {
            let product = req.body;
            product.userId = 1;
            let newProduct = await Product.create(product);
            res.redirect(`/products/${newProduct.id}`);            
        } catch (error) {
            
        }
    },
    editForm: async function(req, res) {
        try {
            let product = await Product.findByPk(req.params.id);
            const categories = await Category.findAll();
            res.render('editProduct', { product, categories });            
        } catch (error) {
            
        }
    },
    edit: async function(req, res) {
        try {
            let productToEdit = await Product.findByPk(req.params.id);
            let editedProduct = req.body
            if(typeof req.body.image === 'undefined') {
                editedProduct.image = productToEdit.image;
            } else {
                fs.unlink(path.join(__dirname, '../../public/img/products', product.image), (err) =>{
                    if(err) {
                        console.error(err);
                        return
                    }
                });
            }
            await productToEdit.update(editedProduct);
            res.redirect(`/products/${req.params.id}`);
        } catch (error) {
            
        }
    },
    delete: async function(req, res) {
        try {
            await Product.destroy({
                where: {
                    id: req.params.id
                },
                force: true
            })
            res.redirect('/products');
        } catch (error) {
            
        }
    },
}