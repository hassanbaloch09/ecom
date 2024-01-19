const { Op, QueryTypes } = require("sequelize");
const db = require("../models");
const Product = db.product;
const ProductImage = db.productImage;
const Category = db.category;
const SubCategory = db.subcategory;
// const { Product, Category, SubCategory } = require('../models');


exports.createProduct = async (req, res) => {
    try {
        const { name,price,description,rich_description,image,brand,count_in_stock,
            category_id,
            sub_category_id,
        } = req.body;
        const newProduct = await Product.create({
            name,price,description,rich_description,image,brand,count_in_stock,
            category_id,
            sub_category_id,
        });
        
        res.status(201).json({ message: 'Product created successfully', product: newProduct });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.findAll({
            include: [
                { model: Category, as: 'category', attributes: ['id', 'name']  },
                { model: SubCategory,  attributes: ['id', 'name']  },
            ]
        });
        res.status(200).json({ products });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

// exports.getProductById = async (req, res) => {
//     try {
//         const productId = req.params.id;
//         const product = await Product.findByPk(productId);
//         if (!product) {
//             return res.status(404).json({ error: 'Product not found' });
//         }

//         res.status(200).json({ product });
//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({ error: 'Internal Server Error' });
//     }
// };


exports.getProductById = async (req, res) => {
    try {
        const productId = req.params.id;
        
        // Include Category and SubCategory models in the query
        const product = await Product.findByPk(productId, {
            include: [
                { model: Category, as: 'category', attributes: ['id', 'name']  },
                { model: SubCategory,  attributes: ['id', 'name']  },
            ]
        });

        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        res.status(200).json({ product });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.updateProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const {
            name,
            price,
            description,
            richDescription,
            image,
            images,
            brand,
            countInStock,
            categoryId,
            subcategoryId,
        } = req.body;

        const product = await Product.findByPk(productId);

        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        // Update the product with non-empty values from the request body
        if (name !== undefined) product.name = name;
        if (price !== undefined) product.price = price;
        if (description !== undefined) product.description = description;
        if (richDescription !== undefined) product.richDescription = richDescription;
        if (image !== undefined) product.image = image;
        if (images !== undefined) product.images = images;
        if (brand !== undefined) product.brand = brand;
        if (countInStock !== undefined) product.countInStock = countInStock;
        if (categoryId !== undefined) product.categoryId = categoryId;
        if (subcategoryId !== undefined) product.subcategoryId = subcategoryId;

        await product.save();

        res.status(200).json({ message: 'Product updated successfully', product });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};


exports.deleteProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const deletedRowCount = await Product.destroy({ where: { id: productId } });

        if (deletedRowCount === 0) {
            return res.status(404).json({ error: 'Product not found' });
        }

        res.status(200).send({message:"success"});
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};
