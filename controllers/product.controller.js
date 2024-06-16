const Product = require('../models/product.model');
const Category = require('../models/category.model');

// add a new Product
exports.create = async (req, res) => {
    try {
        const { name, description, price, quantity, category } = req.body;
        // ensure category is valid
        let foundCategory = await Category.findOne({ name: category });
        if (!foundCategory) {
            return res.status(400).send({ message: `Category "${category}" not found` });
        }
        const product = new Product({ name, description, price, quantity, category });
        const data = await product.save();
        res.send(data);
    } catch (err) {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the product."
        });
    }
};

// get all Products
exports.findAll = (req, res) => {
    // get Products by query if necessary
    let name = req.query.name;
    let condition = name ? { name: { $regex: new RegExp(name, 'i') } } : {};
    Product.find(condition)
        .then(products => res.send(products))
        .catch(err => res.status(500).send({
            message: err.message || "Some error occurred while retrieving products."
        }));
};

// get a Product by id
exports.findOne = (req, res) => {
    Product.findById(req.params.id)
        .then(product => {
            if (!product) return res.status(404).send({
                message: `Product not found with id ${req.params.id}`
            });
            res.send(product);
        })
        .catch(err => res.status(500).send({
            message: `Error retrieving product with id ${req.params.id}`
        }));
};

// update a Product by id
exports.update = (req, res) => {
    const { category, ...updateData } = req.body;
    if (category) {
        // ensure category is valid
        let foundCategory = Category.findOne({ name: category });
        if (!foundCategory) {
            return res.status(400).send({ message: `Category "${category}" not found` });
        }
        updateData.category = category;
    }

    Product.findByIdAndUpdate(req.params.id, req.body, { useFindAndModify: false })
        .then(product => {
            if (!product) return res.status(404).send({
                message: `Product not found with id ${req.params.id}`
            });
            res.send({ message: "Product updated successfully." });
        })
        .catch(err => res.status(500).send({
            message: `Error updating product with id ${req.params.id}`
        }));
};

// remove a Product by id
exports.delete = (req, res) => {
    Product.findByIdAndDelete(req.params.id)
        .then(product => {
            if (!product) return res.status(404).send({
                message: `Product not found with id ${req.params.id}`
            });
            res.send({
                acknowledged: true,
                deletedCount: 1
            });

        })
        .catch(err => res.status(500).send({
            message: `Could not delete product with id ${req.params.id}`
        }));
};

// remove all Products
exports.deleteAll = (req, res) => {
    Product.deleteMany()
        .then(product => {
            res.send({ acknowledged: true, message: `${product.deletedCount} Products deleted successfully!` });
        })
        .catch(err => res.status(500).send({
            message: "Some error occurred while removing all products."
        }));
};