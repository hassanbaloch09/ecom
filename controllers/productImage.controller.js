const { Op, QueryTypes } = require("sequelize");
const db = require("../models");
const ProductImage = db.productImage;

exports.createProductImage = async (req, res) => {
    try {
        const { url } = req.body;
        const newProductImage = await ProductImage.create({
            url,
        });
        res.status(201).json({ message: 'Product image created successfully', productImage: newProductImage });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.getAllProductImages = async (req, res) => {
    try {
        const productImages = await ProductImage.findAll();
        res.status(200).json({ productImages });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.getProductImageById = async (req, res) => {
    try {
        const productImageId = req.params.id;
        const productImage = await ProductImage.findByPk(productImageId);

        if (!productImage) {
            return res.status(404).json({ error: 'Product image not found' });
        }

        res.status(200).json({ productImage });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.updateProductImage = async (req, res) => {
    try {
        const productImageId = req.params.id;
        const { url } = req.body;
        const productImage = await ProductImage.findByPk(productImageId);

        if (!productImage) {
            return res.status(404).json({ error: 'Product image not found' });
        }

        productImage.url = url;
        await productImage.save();
        res.status(200).json({ message: 'Product image updated successfully', productImage });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.deleteProductImage = async (req, res) => {
    try {
        const productImageId = req.params.id;
        const deletedRowCount = await ProductImage.destroy({ where: { id: productImageId } });

        if (deletedRowCount === 0) {
            return res.status(404).json({ error: 'Product image not found' });
        }

        res.status(204).send();
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};
