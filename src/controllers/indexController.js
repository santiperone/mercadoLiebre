const fs = require('fs');
const path = require('path');

const { Product, Sequelize } = require('../data/models');
const Op = Sequelize.Op;

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
    async main(req, res) {
      try {
        const lastSeen = await Product.findAll({
          order: [
            ['createdAt', 'DESC']
          ],
          limit: 4
        });
        
        const offers = await Product.findAll({
          where: {
            discount: {
              [Op.gt]: 0
            }
          },
          limit: 4
        });
        productsPrice(lastSeen);
        productsPrice(offers)
        res.render('index', { title: 'Express', lastSeen, offers});
      } catch (error) {
        res.send(error)
      }
    },
    search: async function(req, res) {
      let products = await Product.findAll({
        where: {
          [Op.or]: [
            {name: {[Op.substring]: req.query.product}},
            {description: {[Op.substring]: req.query.product}},
          ]
        },
        limit: 12
      });
      productsPrice(products);
      res.render('products', { products });
    }
}