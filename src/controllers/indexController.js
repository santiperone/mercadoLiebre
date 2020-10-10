const fs = require('fs');
const path = require('path');
function toThousand(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

module.exports = {
    main: function(req, res, next) {
        let productDataJSON = fs.readFileSync(path.join(__dirname, '../data/productsDataBase.json'));
        let productData = JSON.parse(productDataJSON);
        let lastSeen = productData.filter(prod => prod.category == "visited").slice(0,4);
        let offers = productData.filter(prod => prod.category == "in-sale").slice(0,4);
        offers.forEach(prod => {
          prod.pricewd = Math.round(prod.price * (1 - prod.discount / 100));
          prod.price = toThousand(prod.price);            
          prod.pricewd = toThousand(prod.pricewd);     
        });
        lastSeen.forEach(prod => {
          prod.pricewd = Math.round(prod.price * (1 - prod.discount / 100));
          prod.price = toThousand(prod.price);            
          prod.pricewd = toThousand(prod.pricewd);     
        });
        res.render('index', { title: 'Express', lastSeen, offers});
    },
    search: function(req, res) {
      let products = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/productsDataBase.json')));
      products = products.filter(p => p.name.includes(req.query.product) || p.description.includes(req.query.product));
      products.forEach(prod => {
          prod.pricewd = Math.round(prod.price * (1 - prod.discount / 100));
          prod.price = toThousand(prod.price);            
          prod.pricewd = toThousand(prod.pricewd);     
      });
      res.render('products', { products });
    }
}