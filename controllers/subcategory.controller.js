const { Op, QueryTypes } = require("sequelize");
const db = require("../models");
const SubCategory = db.subcategory;

exports.createSubCategory = async (req, res) => {
    try {
        const { name ,category_id} = req.body;
        const existingSubCategory = await SubCategory.findOne({ where: { name } });
        if (existingSubCategory) {
            return res.status(400).json({ error: 'subCategory with this name already exists' });
        }
        const subCategory = await SubCategory.create({ name,category_id });
        return res.status(201).json(subCategory);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.getSubCategories = async (req, res) => {
    try {
        const subCategories = await SubCategory.findAll();
        return res.status(200).json(subCategories);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};


exports.getSubCategoryById = async (req, res) => {
    try {
        const subCategoryId = req.params.id;
        const subCategory = await SubCategory.findByPk(subCategoryId);
        if (!subCategory) {
            return res.status(404).json({ error: 'SubCategory not found' });
        }

        return res.status(200).json(subCategory);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.updateSubCategory = async (req, res) => {
    try {
        const subCategoryId = req.params.id;
        const { name } = req.body;
        const subCategory = await SubCategory.findByPk(subCategoryId);
        if (!subCategory) {
            return res.status(404).json({ error: 'SubCategory not found' });
        }

        subCategory.name = name;
        await subCategory.save();

        return res.status(200).json(subCategory);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};


exports.deleteSubCategory = async (req, res) => {
    try {
        const subCategoryId = req.params.id;
        const deletedRowCount = await SubCategory.destroy({ where: { id: subCategoryId } });
        if (deletedRowCount === 0) {
            return res.status(404).json({ error: 'SubCategory not found' });
        }
        return res.status(200).send({message:"successfull"});
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

