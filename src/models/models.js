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
    });


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
        name: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
    },
    {
        slug: true
    });

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
    });

const ProductOption = sequelize.define(
    'ProductOption', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Product, // Nome da tabela de produtos (ajuste conforme necessário)
            key: 'id'
        }
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    shape: {
        type: DataTypes.ENUM('square', 'circle'),
        allowNull: true,
        defaultValue: 'square'
    },
    radius: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0
    },
    type: {
        type: DataTypes.ENUM('text', 'color'),
        allowNull: true,
        defaultValue: 'text'
    },
    values: {
        type: DataTypes.STRING,
        allowNull: false
    }
})


Product.hasMany(ProductOption, { foreignKey: 'product_id' });
ProductOption.belongsTo(Product, { foreignKey: 'product_id' });

Category.belongsToMany(Product, { through: 'ProdutoCategoria', foreignKey: 'product_id' });
Product.belongsToMany(Category, { through: 'ProdutoCategoria', foreignKey: 'category_id' });

// Sincronizar o modelo com o banco de dados    
sequelize.sync();

module.exports = {
    User,
    Category,
    Product,
    ProductOption
}