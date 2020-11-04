const {sequelize, DataTypes} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    const product = sequelize.define('Product', {
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        name: DataTypes.STRING,
        price: DataTypes.INTEGER,
        discount: DataTypes.INTEGER,
        category: DataTypes.STRING,
        description: DataTypes.TEXT,
        image: DataTypes.STRING
    })
}