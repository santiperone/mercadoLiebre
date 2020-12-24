const {sequelize, DataTypes} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define('Product', {
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        name: DataTypes.STRING,
        price: DataTypes.INTEGER,
        discount: DataTypes.INTEGER,
        categoryId: DataTypes.INTEGER,
        description: DataTypes.TEXT,
        image: DataTypes.STRING,
        freeShip: DataTypes.TINYINT,
    })
    
    Product.associate = function(models) {
        Product.belongsTo(
          models.Category,
          {
            as: 'category',
            foreignKey: 'categoryId'
          }
        );
      };
      return Product;

}