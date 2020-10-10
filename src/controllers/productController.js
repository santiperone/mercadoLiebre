const fs = require('fs');
const path = require('path');

function toThousand(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};
const productsPath = path.join(__dirname, '../data/productsDataBase.json');
function readProducts() {
    let products = JSON.parse(fs.readFileSync(productsPath));
    products.forEach(prod => {
        prod.pricewd = Math.round(prod.price * (1 - prod.discount / 100));
        prod.price = toThousand(prod.price);            
        prod.pricewd = toThousand(prod.pricewd);     
    });
    return products;
}

module.exports = {
    all: function(req, res, next) {
        let products = readProducts();
        res.render('products', { products });
    },
    detail: function (req, res) {
        let products = readProducts();
        let product = products.filter(prod => prod.id == req.params.id)[0];
        res.render('product-detail', { product });
    },
    createForm: function (req, res) {
        res.render('createProduct');
    },
    create: function(req, res) {
        let products = JSON.parse(fs.readFileSync(productsPath));
        let newProduct = {
            id: products.slice(-1)[0].id + 1,
            ...req.body,
            category: "in-sale"
        }
        products.push(newProduct);
        let productsJson = JSON.stringify(products, null, 2);
        fs.writeFileSync(productsPath, productsJson);
        res.redirect('/products');
    },
    editForm: function(req, res) {
        let products = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/productsDataBase.json')));
        product = products.filter(prod => prod.id == req.params.id)[0];
        res.render('editProduct', { product });
    },
    edit: function(req, res) {
        let products = JSON.parse(fs.readFileSync(productsPath));
        let product = products.filter(prod => prod.id == req.params.id)[0];
        let index = products.indexOf(product);
        let editProduct = {}
        if(typeof req.body.image === 'undefined') {
            editProduct = {
                id: product.id,
                ...req.body,
                image: product.image,
                category: product.category
            };
        } else {
            editProduct = {
                id: product.id,
                ...req.body,
                category: product.category
            }
            fs.unlink(path.join(__dirname, '../../public/img/products', product.image), (err) =>{
                if(err) {
                    console.error(err);
                    return
                }
            });
        }
        products[index] = editProduct
        let productsJson = JSON.stringify(products, null, 2);
        fs.writeFileSync(productsPath, productsJson);
        res.redirect('/products/' + product.id);
    },
    delete: function(req, res) {
        let products = JSON.parse(fs.readFileSync(productsPath));
        products = products.filter(prod => prod.id != req.params.id);
        console.log(products.length);
        let productsJson = JSON.stringify(products, null, 2);
        fs.writeFileSync(productsPath, productsJson);
        res.redirect('/products');
    },
}