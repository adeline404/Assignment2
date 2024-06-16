var express = require("express");
var router = express.Router();
const productController = require("../controllers/product.controller");
const categoryController = require("../controllers/category.controller");

// get all Products
router.get("/products", productController.findAll);

// get a Product by id
router.get("/products/:id", productController.findOne);

// add a new Product
router.post("/products", productController.create);

// update a Product by id
router.put("/products/:id", productController.update);

// remove a Product by id
router.delete("/products/:id", productController.delete);

// remove all Products
router.delete("/products", productController.deleteAll);

// get all categories
router.get("/categories", categoryController.findAll);

// get a category by id
router.get("/categories/:id", categoryController.findOne);

// add a new category
router.post("/categories", categoryController.create);

// update a category by id
router.put("/categories/:id", categoryController.update);

// remove a category by id
router.delete("/categories/:id", categoryController.delete);

// remove all categories
router.delete("/categories", categoryController.deleteAll);

module.exports = router;