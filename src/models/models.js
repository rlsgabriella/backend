const { uri } = require('../config/database.js');

const { Sequelize, DataTypes, QueryTypes } = require('sequelize');

const sequelize = new Sequelize(uri);

const User = sequelize.define(
    'User',
    {
        firstname: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        surname: {
            type: DataTypes.STRING,
            allowNull: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        timestamps: true
    },
);


const Category = sequelize.define(
    'Category',
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        enabled: {
            type: DataTypes.STRING,
            allowNull: false
        },
        name : {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
    },
    {
        slug: true
    },
);
const Product = sequelize.define(
    'Product',
    {
        enabled: {
            type: DataTypes.STRING,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        slug: {
            type: DataTypes.STRING,
            allowNull: false
        },
        use_in_menu: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        stock: {
            type: DataTypes.INTEGER,
            allowNull: true, 
            defaultValue: 0 
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true  
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false 
        },
        price_with_discount: {
            type: DataTypes.FLOAT,
            allowNull: false 
    },
        
    },
);

// Sincronizar o modelo com o banco de dados    
sequelize.sync();

module.exports ={
    User,
    Category,
    Product,
}